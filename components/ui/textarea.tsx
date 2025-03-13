import React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    // Add any additional props if needed
}

const Textarea: React.FC<TextareaProps> = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, ...props }, ref) => {
        return (
            <textarea
                ref={ref}
                className={`border rounded-md p-2 ${className}`} // Add your styling here
                {...props}
            />
        );
    }
);

Textarea.displayName = 'Textarea';

export default Textarea; 