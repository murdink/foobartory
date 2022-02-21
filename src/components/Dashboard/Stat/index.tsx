import React, { FC } from 'react';
import {
  Badge,
  Chip,
  styled,
  SvgIconTypeMap,
  useMediaQuery,
} from '@mui/material';

const StatBadge = styled(Badge)`
  &:not(:last-child) {
    margin-right: 10px;
  }
`;

const Stat: FC<{
  icon: React.ReactElement<SvgIconTypeMap<{}, 'svg'>>;
  value: number;
  label: string;
}> = ({ icon, value, label }) => {
  const matches = useMediaQuery('(min-width:950px)');

  return (
    <StatBadge badgeContent={value} color='warning' showZero max={1000}>
      <Chip
        icon={matches ? icon : undefined}
        label={label}
        variant='outlined'
      />
    </StatBadge>
  );
};

export default Stat;
