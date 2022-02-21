import { FC } from 'react';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useMachineUI } from './hooks';
import { Chip, Divider, ListItem, styled } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';

const StyledChip = styled(Chip)`
  margin-bottom: 16px;
  @media (min-width: 950px) {
    margin-bottom: 0;
  }
`;

const StyledListItem = styled(ListItem)`
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  @media (min-width: 950px) {
    flex-direction: row;
  }
`;

const Robot: FC = () => {
  const { icon, label, buttons } = useMachineUI();
  const matches = useMediaQuery('(min-width:950px)');

  return (
    <>
      <StyledListItem>
        <StyledChip icon={icon} label={label} />
        <ButtonGroup
          size='small'
          variant='contained'
          aria-label='outlined primary button group'
          orientation={matches ? 'horizontal' : 'vertical'}
        >
          {buttons}
        </ButtonGroup>
      </StyledListItem>
      <Divider />
    </>
  );
};

export default Robot;
