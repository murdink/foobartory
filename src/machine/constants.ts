export enum RobotAction {
  StartIdle = 'START_IDLE',
  StartMiningFoo = 'START_MINING_FOO',
  StartMiningBar = 'START_MINING_BAR',
  StartAssemblingFoobar = 'START_ASSEMBLING_FOOBAR',
  StartBuyingRobot = 'START_BUYING_ROBOT',
  StopMiningFoo = 'STOP_MINING_FOO',
  StopMiningBar = 'STOP_MINING_BAR',
  StopAssemblingFoobar = 'STOP_ASSEMBLING_FOOBAR',
  AttemptMineFoo = 'ATTEMPT_MINE_FOO',
  AttemptMineBar = 'ATTEMPT_MINE_BAR',
  AttemptAssembleFoobar = 'ATTEMPT_ASSEMBLE_FOOBAR',
  BuyRobot = 'ASYNC_BUY_ROBOT',
}

export enum RobotState {
  Idle = 'IDLE',
  Moving = 'MOVING',
  MiningFoo = 'MINING_FOO',
  MiningBar = 'MINING_BAR',
  AssemblingFoobar = 'ASSEMBLING_FOOBAR',
}

export enum RobotService {
  AsyncMove = 'ASYNC_MOVE',
  AsyncCollectFoo = 'ASYNC_COLLECT_FOO',
  AsyncCollectBar = 'ASYNC_COLLECT_BAR',
  AsyncAssembleFoobar = 'ASYNC_ASSEMBLE_FOOBAR',
}

export const MOVING_TIME = 5000;
export const MINING_FOO_TIME = 1000;
export const MIN_MINING_BAR_TIME = 500;
export const MAX_MINING_BAR_TIME = 2000;
export const ASSEMBLING_TIME = 2000;
export const BUYING_TIME = 0;
