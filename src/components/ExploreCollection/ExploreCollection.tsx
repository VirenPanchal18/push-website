// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

// React + Web3 Essentials
import React from 'react';
import styled from 'styled-components';

// External Components

// Internal Component
import useMediaQuery from '@site/src/hooks/useMediaQuery';
import { useTranslation } from 'react-i18next';

import ExploreCard from './ExploreCard';

import { H3, ItemV } from '@site/src/css/SharedStyling';

// Internal Configs
import { device } from '@site/src/config/globals';

// Interfaces and Props
interface KnowledgeBaseItem {
  id: string;
  title: string;
  description: string;
  link: string;
}

interface ExploreCollectionProps {
  items?: KnowledgeBaseItem[];
  title?: string | null;
  variant?: 'row' | 'tile';
}

// Helper Functions
// Create custom grid rows
const createGridRows = (items) => {
  const rows = [];
  let index = 0;

  while (index < items?.length) {
    const remainingItems = items.length - index;

    if (remainingItems === 7) {
      // Special case for 7: [3, 2, 2]
      rows.push(items.slice(index, index + 3));
      rows.push(items.slice(index + 3, index + 5));
      rows.push(items.slice(index + 5, index + 7));
      index += 7;
    } else if (remainingItems === 5) {
      // Special case for 5: [3, 2]
      rows.push(items.slice(index, index + 3));
      rows.push(items.slice(index + 3, index + 5));
      index += 5;
    } else if (remainingItems === 4) {
      // Prevent 4 in a row by adjusting previous rows
      if (rows.length > 0 && rows[rows.length - 1].length === 2) {
        rows[rows.length - 1].push(items[index]);
        rows.push(items.slice(index + 1, index + 4));
        index += 4;
      } else {
        rows.push(items.slice(index, index + 2));
        rows.push(items.slice(index + 2, index + 4));
        index += 4;
      }
    } else if (
      rows.length >= 2 &&
      rows[rows.length - 1].length === 2 &&
      rows[rows.length - 2].length === 2 &&
      remainingItems > 2
    ) {
      // Avoid more than 2 consecutive rows of 2
      rows.push(items.slice(index, index + 3));
      index += 3;
    } else {
      // Default case: Create a row of 3 or 2
      const rowSize = remainingItems >= 3 ? 3 : 2;
      rows.push(items.slice(index, index + rowSize));
      index += rowSize;
    }
  }

  return rows;
};

// Helper Component

// Main
const ExploreCollection: React.FC<ExploreCollectionProps> = ({
  items,
  title,
  variant = 'tile',
}) => {
  // Internationalization
  const { t } = useTranslation();

  const isMobile = useMediaQuery(device.mobileL);
  const gridRows = createGridRows(items);

  return (
    <>
      {title && (
        <TitleItemV variant={variant}>
          <H3
            id={t(title).toLowerCase().replace(/\s+/g, '-')}
            fontSize='2.3rem'
            fontWeight='600'
            lineHeight={isMobile ? '100%' : '150%'}
            letterSpacing='-0.8px'
            textAlign={variant === 'row' ? 'left' : 'center'}
            alignSelf={variant === 'row' ? 'flex-start' : 'center'}
            color='var(--ifm-color-white)'
          >
            {t(title)}
          </H3>
        </TitleItemV>
      )}

      <GridWrapper>
        {variant === 'tile' &&
          gridRows?.map((row, rowIndex) => (
            <ChainKnowledgeGrid key={rowIndex} itemsInRow={row.length}>
              {row.map((item, index) => (
                <ExploreCard item={item} index={index} variant='tile' />
              ))}
            </ChainKnowledgeGrid>
          ))}

        {variant === 'row' && (
          <ChainKnowledgeRow>
            {items?.map((row, rowIndex) => (
              <ExploreCard item={row} index={rowIndex} variant='row' />
            ))}
          </ChainKnowledgeRow>
        )}
      </GridWrapper>
    </>
  );
};

export default ExploreCollection;

const GridWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin: 48px 0 0 0;
`;

const TitleItemV = styled(ItemV)`
  align-items: ${({ variant }) =>
    variant === 'row' ? 'flex-start' : 'flex-start'};
  justify-content: ${({ variant }) =>
    variant === 'row' ? 'flex-start' : 'center'};

  @media ${device.tablet} {
    align-items: ${({ variant }) =>
      variant === 'row' ? 'flex-start' : 'center'};
  }
`;

const ChainKnowledgeGrid = styled.div`
  display: grid;
  grid-template-columns: ${({ itemsInRow }) =>
    itemsInRow === 3 ? 'repeat(3, 1fr)' : 'repeat(2, 1fr)'};
  gap: 24px;
  width: 100%;
  justify-content: center;

  @media ${device.laptop} {
    grid-template-columns: repeat(2, 1fr); /* Two items per row for tablets */

    /* Make the third item span full width on tablet */
    & > *:nth-child(3) {
      grid-column: 1 / -1;
    }
  }

  @media ${device.mobileL} {
    grid-template-columns: 1fr; /* One item per row for mobile */
  }
`;

const ChainKnowledgeRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  justify-content: center;
`;
