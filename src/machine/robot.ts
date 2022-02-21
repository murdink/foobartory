import { AnyEventObject, createMachine } from 'xstate';
import { RobotAction, RobotService, RobotState } from './constants';

// Robots are each able to perform several actions:
// - Move to change activity: takes 5 seconds.
// - Mine `foo`: takes 1 second.
// - Mine `bar`: takes a random time between 0.5 and 2 seconds.
// - Assemble a `foobar` from a `foo` and a `bar`: takes 2 seconds.
// - Buy a new robot for 3 `foobar` and 6 `foo`, 0s.

const isEventActionType =
  (actionType: RobotAction): ((_: any, event: AnyEventObject) => boolean) =>
  (_, event) =>
    event.data.actionType === actionType;

export const miningMachine = createMachine({
  id: 'mining',
  initial: RobotState.Idle,
  states: {
    [RobotState.Idle]: {
      on: {
        [RobotAction.StartMiningFoo]: RobotState.Moving,
        [RobotAction.StartMiningBar]: RobotState.Moving,
        [RobotAction.StartAssemblingFoobar]: RobotState.Moving,
        [RobotAction.StartBuyingRobot]: RobotState.Moving,
      },
    },
    [RobotState.Moving]: {
      invoke: {
        src: RobotService.AsyncMove,
        onDone: [
          {
            target: RobotState.MiningFoo,
            cond: isEventActionType(RobotAction.StartMiningFoo),
          },
          {
            target: RobotState.MiningBar,
            cond: isEventActionType(RobotAction.StartMiningBar),
          },
          {
            target: RobotState.AssemblingFoobar,
            cond: isEventActionType(RobotAction.StartAssemblingFoobar),
          },
          {
            target: RobotState.Idle,
            actions: [RobotAction.BuyRobot],
            cond: isEventActionType(RobotAction.StartBuyingRobot),
          },
        ],
      },
    },
    [RobotState.MiningFoo]: {
      on: {
        [RobotAction.StopMiningFoo]: RobotState.Idle,
        [RobotAction.StartMiningBar]: RobotState.Moving,
        [RobotAction.StartAssemblingFoobar]: RobotState.Moving,
        [RobotAction.StartBuyingRobot]: RobotState.Moving,
      },
      invoke: {
        src: RobotService.AsyncCollectFoo,
        onDone: {
          actions: [RobotAction.AttemptMineFoo],
          // The robot will mine foos until it's stopped manually.
          target: RobotState.MiningFoo,
        },
      },
    },
    [RobotState.MiningBar]: {
      on: {
        [RobotAction.StopMiningBar]: RobotState.Idle,
        [RobotAction.StartMiningFoo]: RobotState.Moving,
        [RobotAction.StartAssemblingFoobar]: RobotState.Moving,
        [RobotAction.StartBuyingRobot]: RobotState.Moving,
      },
      invoke: {
        src: RobotService.AsyncCollectBar,
        onDone: {
          actions: [RobotAction.AttemptMineBar],
          // The robot will mine bars until it's stopped manually.
          target: RobotState.MiningBar,
        },
      },
    },
    [RobotState.AssemblingFoobar]: {
      on: {
        [RobotAction.StopAssemblingFoobar]: RobotState.Idle,
        [RobotAction.StartMiningFoo]: RobotState.Moving,
        [RobotAction.StartMiningBar]: RobotState.Moving,
        [RobotAction.StartBuyingRobot]: RobotState.Moving,
      },
      invoke: {
        src: RobotService.AsyncAssembleFoobar,
        onDone: {
          actions: [RobotAction.AttemptAssembleFoobar],
          // The robot will assemble foobars until it's stopped manually.
          target: RobotState.AssemblingFoobar,
        },
      },
    },
  },
});
