import { useMachine } from '@xstate/react';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  selectCanAssembleFoobar,
  selectCanBuyRobot,
  selectCanMineBar,
  selectCanMineFoo,
  updateCounters,
} from '../slices/foobarSlice';
import { selectTimeFactor } from '../slices/timeFactorSlice';
import {
  ASSEMBLING_TIME,
  MAX_MINING_BAR_TIME,
  MINING_FOO_TIME,
  MIN_MINING_BAR_TIME,
  MOVING_TIME,
  RobotAction,
  RobotService,
  RobotState,
} from './constants';
import { miningMachine } from './robot';

const miningBarTime = () =>
  Math.floor(Math.random() * (MAX_MINING_BAR_TIME - MIN_MINING_BAR_TIME + 1)) +
  MIN_MINING_BAR_TIME;

export const useRobotGuards = () => {
  const canMineFoo = useAppSelector(selectCanMineFoo);
  const canMineBar = useAppSelector(selectCanMineBar);
  const canAssembleFoobar = useAppSelector(selectCanAssembleFoobar);
  const canBuyRobot = useAppSelector(selectCanBuyRobot);

  return {
    canMineFoo,
    canMineBar,
    canAssembleFoobar,
    canBuyRobot,
  };
};

export const useMiningMachine = () => {
  const dispatch = useAppDispatch();
  const timeFactor = useAppSelector(selectTimeFactor);
  const { canMineFoo, canMineBar, canAssembleFoobar, canBuyRobot } =
    useRobotGuards();

  const wait = <T>(ms: number, actionType: T | null = null) =>
    new Promise<{ actionType: T } | null>((resolve) =>
      setTimeout(() => {
        resolve(actionType ? { actionType } : null);
      }, ms / timeFactor)
    );

  const [current, send] = useMachine(miningMachine, {
    // https://xstate.js.org/docs/guides/machines.html#options
    actions: {
      [RobotAction.AttemptMineFoo]: () => {
        if (canMineFoo) {
          dispatch(updateCounters({ foos: 1 }));
        }
      },
      [RobotAction.AttemptMineBar]: () => {
        if (canMineBar) {
          dispatch(updateCounters({ bars: 1 }));
        }
      },
      [RobotAction.AttemptAssembleFoobar]: () => {
        if (canAssembleFoobar) {
          // 60% of the time we succeed, in case of failure the `bar` can be reused, the `foo` is lost.
          Math.random() > 0.6
            ? dispatch(updateCounters({ foos: -1 }))
            : dispatch(updateCounters({ foos: -1, bars: -1, foobars: 1 }));
        }
      },
      [RobotAction.BuyRobot]: () => {
        if (canBuyRobot) {
          dispatch(updateCounters({ foos: -6, foobars: -3, robots: 1 }));
        }
      },
    },
    services: {
      [RobotService.AsyncMove]: (_, { type: actionType }) =>
        wait(MOVING_TIME, actionType),
      [RobotService.AsyncCollectFoo]: () => wait(MINING_FOO_TIME),
      [RobotService.AsyncCollectBar]: () => wait(miningBarTime()),
      [RobotService.AsyncAssembleFoobar]: () => wait(ASSEMBLING_TIME),
    },
  });

  return {
    currentValue: current.value as RobotState,
    isMiningFoo: current.matches(RobotState.MiningFoo),
    isMiningBar: current.matches(RobotState.MiningBar),
    isAssemblingFoobar: current.matches(RobotState.AssemblingFoobar),
    isIdle: current.matches(RobotState.Idle),
    isMoving: current.matches(RobotState.Moving),
    startMiningFoo: () => send(RobotAction.StartMiningFoo),
    startMiningBar: () => send(RobotAction.StartMiningBar),
    startAssemblingFoobar: () => send(RobotAction.StartAssemblingFoobar),
    startBuyingRobot: () => send(RobotAction.StartBuyingRobot),
    stopMiningFoo: () => send(RobotAction.StopMiningFoo),
    stopMiningBar: () => send(RobotAction.StopMiningBar),
    stopAssemblingFoobar: () => send(RobotAction.StopAssemblingFoobar),
  };
};
