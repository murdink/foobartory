import { useMemo } from 'react';
import Button from '@mui/material/Button';
import HardwareIcon from '@mui/icons-material/Hardware';
import PauseIcon from '@mui/icons-material/Pause';
import BuildIcon from '@mui/icons-material/Build';
import { CircularProgress, styled, SvgIconTypeMap } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';

import { useMiningMachine } from '../../../machine/hooks';
import { selectCanBuyRobot } from '../../../slices/foobarSlice';
import { useAppSelector } from '../../../app/hooks';
import { RobotState } from '../../../machine/constants';

const MachineButton = styled(Button)`
  width: 200px;
`;

export const useMachineUI = () => {
  const machine = useMiningMachine();
  const canBuyRobot = useAppSelector(selectCanBuyRobot);

  const { icon, label } = useMemo((): {
    icon: React.ReactElement<SvgIconTypeMap<{}, 'svg'>>;
    label: string;
  } => {
    switch (machine.currentValue) {
      case RobotState.Idle:
        return { icon: <PrecisionManufacturingIcon />, label: 'Idle' };
      case RobotState.Moving:
        return { icon: <CircularProgress size={24} />, label: 'Moving' };
      case RobotState.MiningFoo:
      case RobotState.MiningBar:
        return { icon: <HardwareIcon />, label: 'Mining' };
      case RobotState.AssemblingFoobar:
        return { icon: <BuildIcon />, label: 'Assembling' };
      default:
        return {
          icon: <PrecisionManufacturingIcon />,
          // Display the state as a string if we don't know what it is.
          label: machine.currentValue,
        };
    }
  }, [machine.currentValue]);

  const mineFooButton = machine.isMiningFoo ? (
    <MachineButton
      key='stop-mining-foo'
      onClick={machine.stopMiningFoo}
      disabled={!machine.isMiningFoo}
      startIcon={<PauseIcon />}
      color='error'
    >
      Stop Foo
    </MachineButton>
  ) : (
    <MachineButton
      key='start-mining-foo-button'
      onClick={machine.startMiningFoo}
      disabled={machine.isMoving}
      startIcon={<HardwareIcon />}
    >
      Mine Foo
    </MachineButton>
  );

  const mineBarButton = machine.isMiningBar ? (
    <MachineButton
      key='stop-mining-bar-button'
      onClick={machine.stopMiningBar}
      disabled={!machine.isMiningBar}
      startIcon={<PauseIcon />}
      color='error'
    >
      Stop Bar
    </MachineButton>
  ) : (
    <MachineButton
      key='start-mining-bar-button'
      onClick={machine.startMiningBar}
      disabled={machine.isMoving}
      startIcon={<HardwareIcon />}
    >
      Mine Bar
    </MachineButton>
  );

  const assembleFoobarButton = machine.isAssemblingFoobar ? (
    <MachineButton
      key='stop-assembling-foobar-button'
      onClick={machine.stopAssemblingFoobar}
      disabled={!machine.isAssemblingFoobar}
      startIcon={<PauseIcon />}
      color='error'
    >
      Stop Foobar
    </MachineButton>
  ) : (
    <MachineButton
      key='start-assembling-foobar-button'
      onClick={machine.startAssemblingFoobar}
      disabled={machine.isMoving}
      startIcon={<BuildIcon />}
    >
      Assemble Foobar
    </MachineButton>
  );

  const buyRobotButton = (
    <MachineButton
      key='buy-robot-button'
      onClick={machine.startBuyingRobot}
      disabled={machine.isMoving || !canBuyRobot}
      startIcon={<AttachMoneyIcon />}
      color='info'
    >
      Buy robot
    </MachineButton>
  );

  const buttons = [
    mineFooButton,
    mineBarButton,
    assembleFoobarButton,
    buyRobotButton,
  ];

  return { icon, label, buttons };
};
