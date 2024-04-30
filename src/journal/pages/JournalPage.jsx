import { IconButton, Typography } from '@mui/material'
import React from 'react'
import { JournalLayout } from '../layout/JournalLayout'
import { NoteView, NothingSelectedView } from '../views'
import { AddOutlined } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { starNewNote } from '../../store/journal'

export const JournalPage = () => {

  const dispatch = useDispatch();
  const {isSaving, active} = useSelector(state => state.journal)

  const onClickNewNote= () => {
    dispatch(starNewNote())
  }

  return (
    <JournalLayout>
      {/* <Typography>Lorem ipsum dolor, sit amet consectetur adipisicing elit. ?</Typography> */}
      {
        (!!active )?<NoteView/>:<NothingSelectedView/>
      }
      
      {/* <NoteView/> */}
      <IconButton
        disabled={isSaving}
        onClick={onClickNewNote}
        fontSize= 'large'
        sx={{
          color: 'white', 
          backgroundColor:'error.main', 
          ':hover': { backgroundColor: 'error.main' ,opacity: 0.8 }, 
          position: 'fixed',
          right: 50,
          bottom: 50
        }}
      >
        <AddOutlined sx={{fontSize:30}}/>
      </IconButton>
    </JournalLayout>
    
  )
}
