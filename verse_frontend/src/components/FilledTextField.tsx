import React from 'react';
import { Input } from './ui/input';
import { Label } from './ui/label';

interface FilledTextFieldProps {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  icon?: any;
  endIcon?: any;
  onEndIconClick?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  isFocused?: boolean;
}

export const FilledTextField: React.FC<FilledTextFieldProps> = ({ 
  id, 
  label, 
  type = 'text', 
  placeholder, 
  value, 
  onChange, 
  error, 
  icon: Icon, 
  endIcon, 
  onEndIconClick,
  onFocus,
  onBlur,
  isFocused
}) => {
  const hasValue = value.length > 0;
  const hasError = !!error;
  
  return (
    <div className="relative">
      <div className={`
        relative rounded-t-lg bg-input-background border-b-2 transition-all duration-200
        ${hasError ? 'border-destructive' : isFocused ? 'border-primary' : 'border-muted-foreground/40'}
        ${isFocused ? 'md-elevation-1' : ''}
      `}>
        {Icon && (
          <Icon className="absolute left-4 top-6 h-5 w-5 text-muted-foreground" />
        )}
        
        <Input
          id={id}
          type={type}
          value={value}
          placeholder={isFocused ? placeholder : ''}
          onChange={(e) => onChange(e.target.value)}
          onFocus={onFocus}
          onBlur={onBlur}
          className={`
            border-0 bg-transparent h-14 pt-6 pb-2 px-4 rounded-none focus:ring-0 focus:outline-none
            ${Icon ? 'pl-12' : ''}
            ${endIcon ? 'pr-12' : ''}
          `}
        />
        
        <Label 
          htmlFor={id}
          className={`
            absolute left-4 transition-all duration-200 pointer-events-none
            ${Icon ? 'left-12' : ''}
            ${isFocused || hasValue 
              ? 'top-2 text-xs text-primary' 
              : 'top-4 text-base text-muted-foreground'
            }
            ${hasError ? 'text-destructive' : ''}
          `}
        >
          {label}
        </Label>
        
        {endIcon && (
          <button
            type="button"
            onClick={onEndIconClick}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            {endIcon}
          </button>
        )}
      </div>
      
      {error && (
        <p className="text-xs text-destructive mt-1 ml-4">{error}</p>
      )}
    </div>
  );
};