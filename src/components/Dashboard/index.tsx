import { FC } from 'react';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import CropSquareOutlinedIcon from '@mui/icons-material/CropSquareOutlined';
import ChangeHistoryOutlinedIcon from '@mui/icons-material/ChangeHistoryOutlined';
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useAppSelector } from '../../app/hooks';
import {
  selectBarCount,
  selectFoobarCount,
  selectFooCount,
  selectRobotCount,
} from '../../slices/foobarSlice';
import Stat from './Stat';
import TimeFactorSlider from './TimeFactorSlider';
import { styled } from '@mui/material';

const NavBar = styled(AppBar)`
  align-items: center;
  backdrop-filter: blur(10px);
  padding: 10px;
`;

const Dashboard: FC = () => {
  const fooCount = useAppSelector(selectFooCount);
  const barCount = useAppSelector(selectBarCount);
  const foobarCount = useAppSelector(selectFoobarCount);
  const robotCount = useAppSelector(selectRobotCount);

  return (
    <NavBar position='sticky'>
      <Toolbar sx={{ justifyContent: 'center' }}>
        <Stat icon={<CircleOutlinedIcon />} value={fooCount} label='Foo' />
        <Stat icon={<CropSquareOutlinedIcon />} value={barCount} label='Bar' />
        <Stat
          icon={<ChangeHistoryOutlinedIcon />}
          value={foobarCount}
          label='Foobar'
        />
        <Stat
          icon={<SmartToyOutlinedIcon />}
          value={robotCount}
          label='Robot'
        />
      </Toolbar>
      <TimeFactorSlider />
    </NavBar>
  );
};
export default Dashboard;
