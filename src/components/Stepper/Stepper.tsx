import React from 'react';
import styles from './Stepper.module.css';

export interface StepItem {
  label: string;
  active: boolean;
  description?: string;
}

interface StepperProps {
  steps: StepItem[];
}

const Stepper: React.FC<StepperProps> = ({ steps }) => {
  return (
    <>
      <div className={styles['container']}>
        {steps.map((item: StepItem, index: number) => (
          <React.Fragment key={index}>
            <div className={`${styles['item']} ${item.active ? styles['active'] : ''}`}>
              <span>{item.label}</span>
              <span className={`${styles['item-text']} ${item.active ? styles['text-active'] : ''}`}>{item.description}</span>
            </div>
            {(index < steps.length - 1) &&
              <hr className={styles['hr']}/>
            }
          </React.Fragment>
        ))}
      </div>
    </>
  );
};

export default Stepper;
