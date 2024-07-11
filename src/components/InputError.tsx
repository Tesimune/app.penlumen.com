import React from 'react';

interface InputErrorProps {
    error?: { message: string }[]; // Array of objects with 'message' string
    className?: string;
}

const InputError: React.FC<InputErrorProps> = ({ error = [], className = '' }) => (
    <>
        {error.length > 0 && (
            <p className={`${className} text-sm text-red-600`}>
                {error[0].message} {/* Displaying only the first error message */}
            </p>
        )}
    </>
);

export default InputError;
