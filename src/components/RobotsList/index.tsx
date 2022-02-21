import { Card, Divider, List, styled } from '@mui/material';
import { FC } from 'react';
import { useAppSelector } from '../../app/hooks';
import { selectRobotCount } from '../../slices/foobarSlice';
import Robot from './Robot';

const RobotsContainer = styled(Card)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 10px;
  flex: 1;
`;

const BotsList = styled(List)`
  flex: 1;
  flex-wrap: wrap;
  flex-direction: row;
  & > * {
    margin-bottom: 10px;
  }
  @media (min-width: 950px) {
    & > * {
      margin: 0;
    }
  }
`;

const RobotsList: FC = () => {
  const robotCount = useAppSelector(selectRobotCount);

  return (
    <RobotsContainer elevation={4}>
      <BotsList>
        <Divider />
        {[...Array(robotCount)].map((_, i) => (
          <Robot key={i} />
        ))}
      </BotsList>
    </RobotsContainer>
  );
};

export default RobotsList;
