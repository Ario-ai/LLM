import * as React from 'react';
import {Box, List, ListDivider, ListItem,ListItemButton} from '@mui/joy';
import Person from '@mui/icons-material/Person';

export default function Navbar() {
  return (
    <Box component="nav" aria-label="My site" sx={{ flexGrow: 1, backgroundColor: 'white', padding: 1 }} >
      <List role="menubar" orientation="horizontal">
        <ListItem role="none">
          <ListItemButton
            role="menuitem"
            component="a"
            href="/"
            aria-label="Home"
          >
            ArioGPT
          </ListItemButton>
        </ListItem>
        <ListDivider />
        <ListItem role="none">
          <ListItemButton role="menuitem" component="a" href="/">
            Hooty-hoot
          </ListItemButton>
        </ListItem>
        {/* <ListDivider /> */}
        <ListItem role="none">
          <ListItemButton role="menuitem" component="a" href="/ask">
            Query 
          </ListItemButton>
        </ListItem>
        <ListItem role="none" sx={{ marginInlineStart: 'auto' }}>
          <ListItemButton
            role="menuitem"
            component="a"
            href="/"
            aria-label="Profile"
          >
             <Person />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
}