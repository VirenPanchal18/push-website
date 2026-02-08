// React + Web3 Essentials
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled, { css, keyframes } from 'styled-components';

// Internal Component
import { H2, ItemV } from '@site/src/css/SharedStyling';
import { useSendSupportMessage } from './useSendSupportMessage';

// Internal Configs
import { device } from '@site/src/config/globals';

interface FormData {
  name: string;
  email: string;
  category: string;
  subject: string;
  message: string;
}

export interface SupportCategory {
  id: string;
  label: string;
  description: string;
}

interface TypeformSupportProps {
  collapsedText?: string;
  expandedTitle?: string;
  supportCategoryKeys?: string[];
}

export const TypeformSupport: React.FC<TypeformSupportProps> = ({
  collapsedText,
  expandedTitle,
  supportCategoryKeys,
}) => {
  const { t } = useTranslation();

  // Use translations with fallbacks
  const finalCollapsedText =
    collapsedText ||
    t('components.typeform-support.collapsed-text-for-support');
  const finalExpandedTitle =
    expandedTitle ||
    t('components.typeform-support.expanded-title-for-support');

  const supportCategories = supportCategoryKeys?.map((key) => ({
    id: key,
    label: t(`components.typeform-support.categories.${key}.label`),
    description: t(`components.typeform-support.categories.${key}.description`),
  }));

  // Build support categories from translations
  const finalSupportCategories = supportCategories || [
    {
      id: 'technical',
      label: t('components.typeform-support.categories.technical.label'),
      description: t(
        'components.typeform-support.categories.technical.description'
      ),
    },
    {
      id: 'network',
      label: t('components.typeform-support.categories.network.label'),
      description: t(
        'components.typeform-support.categories.network.description'
      ),
    },
    {
      id: 'wallet',
      label: t('components.typeform-support.categories.wallet.label'),
      description: t(
        'components.typeform-support.categories.wallet.description'
      ),
    },
    {
      id: 'identity',
      label: t('components.typeform-support.categories.identity.label'),
      description: t(
        'components.typeform-support.categories.identity.description'
      ),
    },
    {
      id: 'security',
      label: t('components.typeform-support.categories.security.label'),
      description: t(
        'components.typeform-support.categories.security.description'
      ),
    },
    {
      id: 'general',
      label: t('components.typeform-support.categories.general.label'),
      description: t(
        'components.typeform-support.categories.general.description'
      ),
    },
  ];
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const { mutate: sendSupportMessage, isPending: isSubmitting } =
    useSendSupportMessage();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    category: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const steps = [
    {
      id: 'welcome',
      title: t('components.typeform-support.form.steps.contact.title'),
      subtitle: t('components.typeform-support.form.steps.contact.subtitle'),
      field: 'name',
      type: 'text',
      placeholder: t(
        'components.typeform-support.form.steps.contact.name-placeholder'
      ),
      required: true,
    },
    {
      id: 'email',
      title: `${t('components.typeform-support.form.steps.contact.name-aftergreet')}${formData.name}! 📧`,
      subtitle: t('components.typeform-support.form.steps.contact.subtitle'),
      field: 'email',
      type: 'email',
      placeholder: t(
        'components.typeform-support.form.steps.contact.email-placeholder'
      ),
      required: true,
    },
    {
      id: 'category',
      title: t('components.typeform-support.form.steps.category.title'),
      subtitle: t('components.typeform-support.form.steps.category.subtitle'),
      field: 'category',
      type: 'select',
      required: true,
    },
    {
      id: 'subject',
      title: t('components.typeform-support.form.steps.details.title'),
      subtitle: t('components.typeform-support.form.steps.details.subtitle'),
      field: 'subject',
      type: 'text',
      placeholder: t(
        'components.typeform-support.form.steps.details.subject-placeholder'
      ),
      required: true,
    },
    {
      id: 'message',
      title: t('components.typeform-support.form.steps.details.title'),
      subtitle: t('components.typeform-support.form.steps.details.subtitle'),
      field: 'message',
      type: 'textarea',
      placeholder: t(
        'components.typeform-support.form.steps.details.message-placeholder'
      ),
      required: true,
    },
  ];

  const validateField = (field: string, value: string): string | null => {
    if (!value.trim()) {
      if (field === 'name')
        return t('components.typeform-support.form.validation.name-required');
      if (field === 'email')
        return t('components.typeform-support.form.validation.email-required');
      if (field === 'subject')
        return t(
          'components.typeform-support.form.validation.subject-required'
        );
      if (field === 'message')
        return t(
          'components.typeform-support.form.validation.message-required'
        );
      if (field === 'category')
        return t(
          'components.typeform-support.form.validation.category-required'
        );
      return 'components.typeform-support.form.validation.default';
    }

    if (field === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value))
        return t('components.typeform-support.form.validation.email-invalid');
    }

    if (field === 'name' && value.length < 2) {
      return t('components.typeform-support.form.validation.name-min-length');
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
      window.gtag('event', 'support_form_step_complete', {
        event_category: 'support',
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

    // Find the selected category to get its details
    const selectedCategory = finalSupportCategories.find(
      (cat) => cat.id === formData.category
    );

    // Map form data to API payload format
    const payload = {
      from: formData.email,
      name: formData.name,
      topic: formData.category,
      sub: formData.subject,
      msg: formData.message,
      topictype: selectedCategory?.id || formData.category,
      topiclabel: selectedCategory?.label || formData.category,
      topicdesc: selectedCategory?.description || formData.category,
    };

    sendSupportMessage(payload, {
      onSuccess: () => {
        setIsComplete(true);

        // Track successful form submission
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'support_form_submit', {
            event_category: 'support',
            event_label: `category_${formData.category}`,
            value: 1,
          });
        }
      },
      onError: (error) => {
        console.error('Error submitting form:', error);
        setSubmitError(t('components.typeform-support.form.error.message'));

        // Track form submission error
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'support_form_error', {
            event_category: 'support',
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
    // Allow Enter to create new lines in textarea
    // Only prevent form submission on Ctrl+Enter or Cmd+Enter
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      handleNext();
    }
    // Regular Enter key creates new lines - no preventDefault needed
  };

  const resetForm = () => {
    setCurrentStep(0);
    setIsComplete(false);
    setIsExpanded(true);
    setSubmitError(null);
    setFormData({
      name: '',
      email: '',
      category: '',
      subject: '',
      message: '',
    });
    setErrors({});
  };

  // Show collapsed button if not expanded
  if (!isExpanded) {
    return (
      <CollapsedWrapper>
        <ExpandButton
          id='typeform-expand-button'
          onClick={() => {
            setIsExpanded(true);
            // Track form expansion
            if (typeof window !== 'undefined' && window.gtag) {
              window.gtag('event', 'support_form_start', {
                event_category: 'support',
                event_label: 'form_opened',
                value: 1,
              });
            }
          }}
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
            {t('components.typeform-support.form.success.title')}
          </SuccessTitle>
          <SuccessMessage>
            {t('components.typeform-support.form.success.message')}
          </SuccessMessage>
          <ResetButton onClick={resetForm}>
            {t('components.typeform-support.form.success.button')}
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
          {currentStep + 1} of {steps.length}
        </StepCounter>

        <StepContent>
          <StepTitle>{currentStepData.title}</StepTitle>
          <StepSubtitle>{currentStepData.subtitle}</StepSubtitle>

          {currentStepData.type === 'select' ? (
            <CategoryGrid>
              {finalSupportCategories.map((category) => (
                <CategoryCard
                  key={category.id}
                  selected={formData.category === category.id}
                  onClick={() => handleInputChange('category', category.id)}
                >
                  <CategoryLabel>{category.label}</CategoryLabel>
                  <CategoryDescription>
                    {category.description}
                  </CategoryDescription>
                </CategoryCard>
              ))}
            </CategoryGrid>
          ) : currentStepData.type === 'textarea' ? (
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
            <BackButton onClick={handleBack}>← Back</BackButton>
          )}

          <NextButton
            onClick={handleNext}
            disabled={isSubmitting}
            isPrimary={currentStep === steps.length - 1}
          >
            {isSubmitting ? (
              <>⏳ Submitting...</>
            ) : currentStep === steps.length - 1 ? (
              'Submit →'
            ) : (
              'Continue →'
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

const ExpandButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 16px;
  padding: 20px 24px;
  font-size: 24px;
  font-weight: 600;
  border: 2px solid var(--ifm-color-primary-unified-inverse);
  border-radius: 12px;
  background: transparent;
  color: var(--ifm-color-primary-unified-text);
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

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;

  @media ${device.tablet} {
    grid-template-columns: repeat(2, 1fr);
  }

  @media ${device.mobileL} {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const CategoryCard = styled.div<{ selected: boolean }>`
  padding: 20px;
  border-radius: 12px;
  background: ${(props) =>
    props.selected
      ? 'color-mix(in srgb, var(--ifm-color-primary-unified) 25%, transparent 75%)'
      : 'rgba(255, 255, 255, 0.1)'};
  border: 2px solid
    ${(props) =>
      props.selected ? 'var(--ifm-color-primary-unified)' : 'transparent'};
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  }

  ${(props) =>
    props.selected &&
    css`
      animation: ${pulse} 0.5s ease-out;
    `}
`;

const CategoryLabel = styled.div`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
`;

const CategoryDescription = styled.div`
  font-size: 14px;
  opacity: 0.8;
  line-height: 1.4;
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

  /* When NextButton is the only child, align it to the end */
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
