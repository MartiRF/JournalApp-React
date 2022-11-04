import {  TurnedInNot } from '@mui/icons-material'
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import React, { useMemo } from 'react'
import { useDispatch } from 'react-redux';
import { setActiveNote } from '../../store/journal/journalSlice';

export const SideBarItem = ({ note }) => {
    const {title = ''} = note;

    const dispatch = useDispatch()

    const newTitle = useMemo(() => {
        return title.length > 17 ? title.substring(0,17) + '...' : title;
    },[title])


    const onNoteActive = () => {
        dispatch(setActiveNote(note))
    }

  return (
    <ListItem disablePadding onClick={onNoteActive}>
        <ListItemButton>
            <ListItemIcon>
                <TurnedInNot />
            </ListItemIcon>
            <Grid container>
                <ListItemText primary={ newTitle } />
                <ListItemText secondary={ note.body } />
            </Grid>
        </ListItemButton>    
    </ListItem>
  )
}
