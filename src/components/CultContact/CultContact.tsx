import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled, { css, keyframes } from 'styled-components';

import { H2, ItemV } from '@site/src/css/SharedStyling';
import { useSendCultContactMessage } from './useSendCultContactMessage';

import { device } from '@site/src/config/globals';

interface FormData {
  email: string;
  xUsername: string;
  telegramId: string;
  bestContent: string;
  message: string;
}

interface CultContactProps {
  collapsedText?: string;
  expandedTitle?: string;
  theme?: 'blood' | 'default';
}

export const CultContact: React.FC<CultContactProps> = ({
  collapsedText,
  expandedTitle,
  theme = 'default',
}) => {
  const { t } = useTranslation();

  // Use translations with fallbacks
  const finalCollapsedText =
    collapsedText || t('components.cult-contact.collapsed-text');
  const finalExpandedTitle =
    expandedTitle || t('components.cult-contact.expanded-title');
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const { mutate: sendCultMessage, isPending: isSubmitting } =
    useSendCultContactMessage();
  const [formData, setFormData] = useState<FormData>({
    email: '',
    xUsername: '',
    telegramId: '',
    bestContent: '',
    message: '',
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const steps = [
    {
      id: 'email',
      title: t('components.cult-contact.form.steps.email.title'),
      subtitle: t('components.cult-contact.form.steps.email.subtitle'),
      field: 'email',
      type: 'email',
      placeholder: t('components.cult-contact.form.steps.email.placeholder'),
      required: true,
    },
    {
      id: 'xUsername',
      title: t('components.cult-contact.form.steps.x-username.title'),
      subtitle: t('components.cult-contact.form.steps.x-username.subtitle'),
      field: 'xUsername',
      type: 'text',
      placeholder: t(
        'components.cult-contact.form.steps.x-username.placeholder'
      ),
      required: true,
    },
    {
      id: 'telegramId',
      title: t('components.cult-contact.form.steps.telegram-id.title'),
      subtitle: t('components.cult-contact.form.steps.telegram-id.subtitle'),
      field: 'telegramId',
      type: 'text',
      placeholder: t(
        'components.cult-contact.form.steps.telegram-id.placeholder'
      ),
      required: true,
    },
    {
      id: 'bestContent',
      title: t('components.cult-contact.form.steps.best-content.title'),
      subtitle: t('components.cult-contact.form.steps.best-content.subtitle'),
      field: 'bestContent',
      type: 'text',
      placeholder: t(
        'components.cult-contact.form.steps.best-content.placeholder'
      ),
      required: true,
    },
    {
      id: 'message',
      title: t('components.cult-contact.form.steps.message.title'),
      subtitle: t('components.cult-contact.form.steps.message.subtitle'),
      field: 'message',
      type: 'textarea',
      placeholder: t('components.cult-contact.form.steps.message.placeholder'),
      required: true,
    },
  ];

  const validateField = (field: string, value: string): string | null => {
    if (!value.trim()) {
      if (field === 'email')
        return t('components.cult-contact.form.validation.email-required');
      if (field === 'xUsername')
        return t('components.cult-contact.form.validation.x-username-required');
      if (field === 'telegramId')
        return t(
          'components.cult-contact.form.validation.telegram-id-required'
        );
      if (field === 'bestContent')
        return t(
          'components.cult-contact.form.validation.best-content-required'
        );
      if (field === 'message')
        return t('components.cult-contact.form.validation.message-required');
      return t('components.cult-contact.form.validation.default');
    }

    if (field === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value))
        return t('components.cult-contact.form.validation.email-invalid');
    }

    if (field === 'bestContent' && !value.startsWith('http')) {
      return t('components.cult-contact.form.validation.best-content-invalid');
    }

    return null;
  };

  const handleNext = () => {
    const currentField = steps[currentStep].field;
    const value = formData[currentField as keyof FormData];
    const error = validateField(currentField, value);

    if (error) {
      setErrors({ ...errors, [currentField]: error });
      return;
    }

    setErrors({ ...errors, [currentField]: undefined });

    // Track step progression
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'cult_form_step_complete', {
        event_category: 'cult_registration',
        event_label: `step_${currentStep + 1}_${currentField}`,
        value: currentStep + 1,
      });
    }

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field as keyof FormData]) {
      setErrors({ ...errors, [field]: undefined });
    }
  };

  const handleSubmit = () => {
    setSubmitError(null);

    const payload = {
      email: formData.email,
      xUsername: formData.xUsername,
      telegramId: formData.telegramId,
      bestContent: formData.bestContent,
      message: formData.message,
    };

    sendCultMessage(payload, {
      onSuccess: () => {
        setIsComplete(true);

        // Track successful form submission
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'cult_form_submit', {
            event_category: 'cult_registration',
            event_label: 'form_completed',
            value: 1,
          });
        }
      },
      onError: (error) => {
        console.error('Error submitting form:', error);
        setSubmitError(
          'Error submitting your application. Please try again later.'
        );

        // Track form submission error
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'cult_form_error', {
            event_category: 'cult_registration',
            event_label: 'submission_failed',
            value: 0,
          });
        }
      },
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleNext();
    }
  };

  const handleTextareaKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      handleNext();
    }
  };

  const resetForm = () => {
    setCurrentStep(0);
    setIsComplete(false);
    setIsExpanded(true);
    setSubmitError(null);
    setFormData({
      email: '',
      xUsername: '',
      telegramId: '',
      bestContent: '',
      message: '',
    });
    setErrors({});
  };

  if (!isExpanded) {
    return (
      <CollapsedWrapper id='apply-to-cult'>
        <ExpandButton
          id='cult-expand-button'
          onClick={() => {
            setIsExpanded(true);
            // Track form expansion
            if (typeof window !== 'undefined' && window.gtag) {
              window.gtag('event', 'cult_form_start', {
                event_category: 'cult_registration',
                event_label: 'form_opened',
                value: 1,
              });
            }
          }}
          $theme={theme}
        >
          <PlusIcon isExpanded={false}>+</PlusIcon>
          <ButtonText>{finalCollapsedText}</ButtonText>
        </ExpandButton>
      </CollapsedWrapper>
    );
  }

  if (isComplete) {
    return (
      <Container>
        <SuccessWrapper>
          <SuccessIcon>🎉</SuccessIcon>
          <SuccessTitle>
            {t('components.cult-contact.form.success.title')}
          </SuccessTitle>
          <SuccessMessage>
            {t('components.cult-contact.form.success.message-before-link')}{' '}
            <a
              href='https://discord.com/invite/pushchain'
              target='_blank'
              rel='noopener noreferrer'
              style={{
                color: 'var(--ifm-color-primary-unified)',
                textDecoration: 'underline',
              }}
            >
              {t('components.cult-contact.form.success.discord-link-text')}
            </a>{' '}
            {t('components.cult-contact.form.success.message-after-link')}{' '}
            <strong>
              {t('components.cult-contact.form.success.channel-name')}
            </strong>{' '}
            {t('components.cult-contact.form.success.message-end')}
          </SuccessMessage>
          <ResetButton onClick={resetForm}>
            {t('components.cult-contact.form.success.button')}
          </ResetButton>
        </SuccessWrapper>
      </Container>
    );
  }

  const currentStepData = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <Container>
      <ExpandedHeader>
        <ExpandedTitle>{finalExpandedTitle}</ExpandedTitle>
        <CollapseButton onClick={() => setIsExpanded(false)}>
          <PlusIcon isExpanded={true}>+</PlusIcon>
        </CollapseButton>
      </ExpandedHeader>
      <FormWrapper>
        <ProgressBar>
          <ProgressFill progress={progress} />
        </ProgressBar>

        <StepCounter>
          {t('components.cult-contact.form.progress.step-counter', {
            current: currentStep + 1,
            total: steps.length,
          })}
        </StepCounter>

        <StepContent>
          <StepTitle>{currentStepData.title}</StepTitle>
          <StepSubtitle>
            {currentStepData.subtitle === 'discord-link' ? (
              <>
                First, join{' '}
                <a
                  href='https://discord.gg/TwyVAJq7rN'
                  target='_blank'
                  rel='noopener noreferrer'
                  style={{
                    color: 'var(--ifm-color-primary-unified)',
                    textDecoration: 'underline',
                  }}
                >
                  Push Chain Discord
                </a>{' '}
                and then share your Discord username
              </>
            ) : (
              currentStepData.subtitle
            )}
          </StepSubtitle>

          {currentStepData.type === 'textarea' ? (
            <StyledTextArea
              value={formData[currentStepData.field as keyof FormData]}
              onChange={(e) =>
                handleInputChange(currentStepData.field, e.target.value)
              }
              placeholder={currentStepData.placeholder}
              onKeyPress={handleTextareaKeyPress}
              hasError={!!errors[currentStepData.field as keyof FormData]}
              autoFocus
            />
          ) : (
            <StyledInput
              type={currentStepData.type}
              value={formData[currentStepData.field as keyof FormData]}
              onChange={(e) =>
                handleInputChange(currentStepData.field, e.target.value)
              }
              placeholder={currentStepData.placeholder}
              onKeyPress={handleKeyPress}
              hasError={!!errors[currentStepData.field as keyof FormData]}
              autoComplete={
                currentStepData.field === 'name'
                  ? 'name'
                  : currentStepData.field === 'email'
                    ? 'email'
                    : 'off'
              }
              autoFocus
            />
          )}

          {errors[currentStepData.field as keyof FormData] && (
            <ErrorMessage>
              {errors[currentStepData.field as keyof FormData]}
            </ErrorMessage>
          )}
        </StepContent>

        <ButtonGroup>
          {currentStep > 0 && (
            <BackButton onClick={handleBack}>
              ← {t('components.cult-contact.form.buttons.previous')}
            </BackButton>
          )}

          <NextButton
            onClick={handleNext}
            disabled={isSubmitting}
            isPrimary={currentStep === steps.length - 1}
          >
            {isSubmitting ? (
              <>⏳ {t('components.cult-contact.form.buttons.submitting')}</>
            ) : currentStep === steps.length - 1 ? (
              <>{t('components.cult-contact.form.buttons.submit')} →</>
            ) : (
              <>{t('components.cult-contact.form.buttons.next')} →</>
            )}
          </NextButton>
        </ButtonGroup>
        <ItemV justifyContent='end'>
          {submitError && <ErrorMessage>{submitError}</ErrorMessage>}
        </ItemV>
        <KeyboardHint>
          Press <kbd>Enter</kbd> to continue
        </KeyboardHint>
      </FormWrapper>
    </Container>
  );
};

// Animations
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideIn = keyframes`
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
`;

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
`;

// Styled Components
const CollapsedWrapper = styled.div`
  width: 100%;
  padding: 20px 0px;
`;

const ExpandButton = styled.button<{ $theme?: 'blood' | 'default' }>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 16px;
  padding: 20px 24px;
  font-size: 24px;
  font-weight: 600;
  border: 2px solid
    ${(props) =>
      props.$theme === 'blood'
        ? 'var(--ifm-color-primary-unified)'
        : 'var(--ifm-color-primary-unified-inverse)'};
  border-radius: 12px;
  background: transparent;
  color: ${(props) =>
    props.$theme === 'blood'
      ? 'var(--ifm-color-primary)'
      : 'var(--ifm-color-primary-unified-inverse)'};
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: inherit;

  &:hover {
    background: var(--ifm-color-primary-unified-inverse);
    color: var(--ifm-color-primary-unified-text-inverse);
  }

  @media ${device.tablet} {
    font-size: 20px;
    padding: 24px 32px;
  }

  @media ${device.mobileL} {
    font-size: 20px;
    padding: 20px 16px;
    gap: 8px;
  }
`;

const PlusIcon = styled.div<{ isExpanded: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  font-size: 24px;
  font-weight: bold;
  transition: transform 0.3s ease;
  transform: ${(props) =>
    props.isExpanded ? 'rotate(45deg)' : 'rotate(0deg)'};

  ${ExpandButton}:hover & {
    transform: ${(props) =>
      props.isExpanded ? 'rotate(45deg) scale(1.1)' : 'rotate(90deg)'};
  }
`;

const ButtonText = styled.h2`
  margin: 0;
  font-size: inherit;
  font-weight: inherit;
  color: inherit;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background: var(--ifm-color-primary-unified-text-inverse);
  color: white;
  position: relative;
  border: 2px solid var(--ifm-color-primary-unified-inverse);
  border-radius: 12px;
  padding: 20px;
  margin: 20px 0;
`;

const ExpandedHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const ExpandedTitle = styled.h2`
  margin: 0;
  font-size: 24px;
  font-weight: 600;

  @media ${device.tablet} {
    font-size: 28px;
  }
`;

const CollapseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: 2px solid var(--ifm-color-primary-unified-inverse);
  border-radius: 8px;
  background: transparent;
  color: var(--ifm-color-primary-unified-text);
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: inherit;

  &:hover {
    background: var(--ifm-color-primary-unified-text);
    color: var(--ifm-color-primary-unified-text-inverse);
    transform: scale(1.05);
  }
`;

const FormWrapper = styled.div`
  max-width: 600px;
  width: inherit;
  margin: 0 auto;
  padding: 40px 20px;
  ${css`
    animation: ${fadeIn} 0.6s ease-out;
  `}

  @media ${device.tablet} {
    padding: 60px 40px;
  }

  @media ${device.mobileL} {
    padding: 60px 10px;
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
  margin-bottom: 20px;
  overflow: hidden;
`;

const ProgressFill = styled.div<{ progress: number }>`
  height: 100%;
  width: ${(props) => props.progress}%;
  background: linear-gradient(
    90deg,
    var(--ifm-color-primary-darkest) 0%,
    var(--ifm-color-primary-unified) 100%
  );
  border-radius: 2px;
  transition: width 0.3s ease;
  ${css`
    animation: ${slideIn} 0.5s ease-out;
  `}
`;

const StepCounter = styled.div`
  font-size: 14px;
  opacity: 0.8;
  margin-bottom: 40px;
  text-align: center;
`;

const StepContent = styled.div`
  margin-bottom: 40px;
  ${css`
    animation: ${fadeIn} 0.5s ease-out;
  `}
`;

const StepTitle = styled(H2)`
  margin-bottom: 16px;
  line-height: 1.2;

  @media ${device.tablet} {
    font-size: 40px;
  }
`;

const StepSubtitle = styled.p`
  font-size: 18px;
  opacity: 0.9;
  margin-bottom: 40px;
  line-height: 1.5;

  @media ${device.tablet} {
    font-size: 20px;
  }
`;

const StyledInput = styled.input<{ hasError?: boolean }>`
  width: 100%;
  padding: 16px 20px;
  font-size: 18px;
  border: 2px solid
    ${(props) =>
      props.hasError ? 'var(--ifm-color-primary-unified)' : 'transparent'};
  border-radius: 12px;
  background: var(--ifm-color-secondary-blog);
  color: white;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;

  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }

  &:focus {
    outline: none;
    border-color: var(--ifm-color-primary-unified);
    background: rgba(255, 255, 255, 0.15);
    transform: translateY(-2px);
    box-shadow: 0 8px 25px
      color-mix(in srgb, var(--ifm-color-primary-unified) 50%, transparent 50%);
  }
`;

const StyledTextArea = styled.textarea<{ hasError?: boolean }>`
  width: 100%;
  min-height: 120px;
  padding: 16px 20px;
  font-size: 18px;
  border: 2px solid
    ${(props) =>
      props.hasError ? 'var(--ifm-color-primary-unified)' : 'transparent'};
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  resize: vertical;
  font-family: 'DM Sans', sans-serif;

  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }

  &:focus {
    outline: none;
    border-color: var(--ifm-color-primary-unified);
    background: rgba(255, 255, 255, 0.15);
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(79, 172, 254, 0.3);
  }
`;

const ErrorMessage = styled.div`
  color: var(--ifm-color-primary-unified);
  font-size: 14px;
  margin-top: 8px;
  padding-left: 4px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 16px;
  justify-content: space-between;
  align-items: center;

  & > button:only-child {
    margin-left: auto;
  }
`;

const BackButton = styled.button`
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 600;
  border: 2px solid var(--ifm-color-secondary-blog);
  border-radius: 8px;
  background: transparent;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: var(--ifm-color-secondary-blog);
    transform: translateY(-2px);
  }
`;

const NextButton = styled.button<{ isPrimary?: boolean }>`
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 600;
  border: 2px solid transparent;
  border-radius: 8px;
  background: ${(props) =>
    props.isPrimary
      ? 'linear-gradient(90deg, var(--ifm-color-primary-unified) 0%, var(--ifm-color-primary-dark) 100%)'
      : 'rgba(255, 255, 255, 0.2)'};
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 120px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px
      color-mix(in srgb, var(--ifm-color-primary-unified) 25%, transparent 75%);
    border: 2px solid var(--ifm-color-primary-unified-inverse);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const KeyboardHint = styled.div`
  text-align: center;
  font-size: 14px;
  color: color-mix(
    in srgb,
    var(--ifm-color-primary-unified-text) 60%,
    transparent 40%
  );
  margin-top: 20px;

  kbd {
    background: rgba(255, 255, 255, 0.2);
    padding: 4px 8px;
    margin: 0px 4px;
    border-radius: 4px;
    font-family: monospace;
    color: var(--ifm-color-primary-unified-text);
  }
`;

const SuccessWrapper = styled.div`
  text-align: center;
  padding: 60px 20px;
  ${css`
    animation: ${fadeIn} 0.8s ease-out;
  `}
`;

const SuccessIcon = styled.div`
  font-size: 64px;
  margin-bottom: 24px;
  ${css`
    animation: ${pulse} 1s ease-out;
  `}
`;

const SuccessTitle = styled.h2`
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 16px;
`;

const SuccessMessage = styled.p`
  font-size: 18px;
  opacity: 0.9;
  margin-bottom: 40px;
  line-height: 1.5;
`;

const ResetButton = styled.button`
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 600;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  background: transparent;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-2px);
  }
`;
