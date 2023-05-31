import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {cleanStatistics, selectLoading, selectSearchLoading, selectStatistics} from "./transactionsSlice";
import {useParams} from "react-router-dom";
import {searchTransactions} from "./transactionsThunks";
import {selectCategories} from "../categories/categoriesSlice";
import {fetchCategories} from "../categories/categoriesThunks";
import {Box, CircularProgress, MenuItem, TextField, Typography} from "@mui/material";
import {Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis} from "recharts";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DemoContainer} from "@mui/x-date-pickers/internals/demo";
import {LoadingButton} from "@mui/lab";
import {enqueueSnackbar} from "notistack";
import type {StatisticsMutation} from "../../types";

const Statistics = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const loading = useAppSelector(selectLoading);
  const loadingSearch = useAppSelector(selectSearchLoading);
  const statistics = useAppSelector(selectStatistics);
  const {id} = useParams() as { id: string };

  const [state, setState] = React.useState<StatisticsMutation>({
    start: null,
    end: null,
    category: '',
    account: id,
  });

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;

    setState(prevState => {
      return {...prevState, [name]: value};
    });
  };

  const submitFormHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    if (state.end && state.start) {
      await dispatch(searchTransactions(state));
    } else {
      enqueueSnackbar('Please select both dates!', {variant: 'warning'});
    }
  };

  let statisticsBox = (
    <Typography
      component={'h6'}
      variant={'h6'}
      sx={{m: 2, fontWeight: 'bolder', textAlign: 'center'}}
    >
      No transaction for this period
    </Typography>
  )

  if (statistics.length) {
    statisticsBox = (<BarChart
      width={900}
      height={400}
      data={statistics}
      margin={{
        top: 5,
        right: 30,
        left: 30,
        bottom: 5,
      }}
      style={{display: 'block', margin: '10px auto'}}
    >
      <CartesianGrid strokeDasharray="3 3"/>
      <XAxis dataKey="date"/>
      <YAxis/>
      <Tooltip/>
      <Legend/>
      <Bar dataKey="KGS" fill="#8884d8"/>
    </BarChart>)
  }

  useEffect(() => {
    dispatch(cleanStatistics());
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div>
      {loading ? <Box sx={{display: 'flex', justifyContent: 'center'}}>
        <CircularProgress color={'warning'} thickness={6} style={{translate: ''}}/>
      </Box> : <>
        <form
          autoComplete="off"
          onSubmit={submitFormHandler}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker', 'DatePicker', 'TextField']}>
              <DatePicker
                label="Period start"
                format={'DD/MM/YY'}
                value={state.start}
                onChange={(newValue) => setState((prev) => ({...prev, start: newValue}))}
              />
              <DatePicker
                label="Period end"
                format={'DD/MM/YY'}
                value={state.end}
                minDate={state.start}
                onChange={(newValue) => setState((prev) => ({...prev, end: newValue}))}
              />
              <TextField
                select
                name="category"
                value={state.category}
                label="Category"
                onChange={inputChangeHandler}
                required
              >
                <MenuItem value="" disabled>Please select a category</MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category._id} value={category._id}>{category.title}</MenuItem>
                ))}
              </TextField>
            </DemoContainer>
          </LocalizationProvider>
          <LoadingButton
            type="submit"
            color="info"
            variant="outlined"
            sx={{my: 2, display: 'block', mx: 'auto'}}
          >
            Show statistic
          </LoadingButton>
        </form>
        {loadingSearch ? <Box sx={{display: 'flex', justifyContent: 'center'}}>
          <CircularProgress color={'warning'} thickness={6} style={{translate: ''}}/>
        </Box> : statisticsBox
        }
      </>}
    </div>
  );
};

export default Statistics;