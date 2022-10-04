import { TurnedInNot } from '@mui/icons-material'
import { Box, Divider, Drawer, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material'
import React from 'react'

export const SideBar = ({ drawerWidth }) => {
  return (
    <Box component='nav'
        sx={{width: {sm: drawerWidth}, flexShrink:{ sm:0 }}}>
        
        <Drawer variant='permanent' open={true}
            sx={{ display:{xs:'block'}, '& .MuiDrawer-paper': {boxSizing:'border-box', width: drawerWidth}}}>
            <Toolbar>
                <Typography variant='h6' noWrap component='div'>Martin Reyes</Typography>
            </Toolbar>
            <Divider />

            <List>
                {
                    ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Septiembre','Octubre','Noviembre'].map(text => 
                    <ListItem key={ text } disablePadding >
                        <ListItemButton>
                            <ListItemIcon>
                                <TurnedInNot />
                            </ListItemIcon>
                            <Grid conatiner>
                                <ListItemText primary={ text } />
                                <ListItemText secondary={ 'Mama mia '} />
                            </Grid>
                        </ListItemButton>    
                    </ListItem>)
                }
            </List>

        </Drawer>

    </Box>
  )
}
