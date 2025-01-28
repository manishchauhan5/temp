import React, { useState } from 'react';
import RequestOTP from './RequestOTP';
import VerifyOTP from './VerifyOTP';
import SetNewPassword from './SetNewPassword';

const PasswordResetFlow = () => {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');

    const handleStepChange = (nextStep, email = '') => {
        if (email) {
            setEmail(email);
        }
        setStep(nextStep);
    };

    const renderStep = () => {
        switch (step) {
            case 1:
                return <RequestOTP onStepChange={(email) => handleStepChange(2, email)} />;
            case 2:
                return <VerifyOTP email={email} onStepChange={() => handleStepChange(3)} />;
            case 3:
                return <SetNewPassword email={email} />;
            default:
                return <div>Invalid Step</div>;
        }
    };

    return <div>{renderStep()}</div>;
};

export default PasswordResetFlow;
