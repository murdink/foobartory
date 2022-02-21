import { FC } from 'react';
import { Box, Slider } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  selectTimeFactor,
  updateTimeFactor,
} from '../../../slices/timeFactorSlice';

const MIN_TIME_FACTOR = 1;
const MAX_TIME_FACTOR = 10;
const STEP = 1;
const numberOfMarks = MAX_TIME_FACTOR / STEP;
const marks = [...Array(numberOfMarks)].map((_, i) => ({
  value: (i + 1) * STEP,
  label: `${(i + 1) * STEP}x`,
}));

const TimeFactorSlider: FC = () => {
  const dispatch = useAppDispatch();
  const timeFactor = useAppSelector(selectTimeFactor);

  return (
    <Box sx={{ width: 250 }}>
      <Slider
        aria-label='Time factor'
        getAriaValueText={(value) => `${value}x`}
        valueLabelDisplay='auto'
        step={STEP}
        marks={marks}
        min={MIN_TIME_FACTOR}
        max={MAX_TIME_FACTOR}
        value={timeFactor}
        onChange={(_, value) => {
          dispatch(updateTimeFactor(value as number));
        }}
      />
    </Box>
  );
};

export default TimeFactorSlider;
