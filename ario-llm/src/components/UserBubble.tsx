import { Sheet, Grid, Box } from '@mui/joy';
import Person from '@mui/icons-material/Person';

const UserBubble = ({ children }: { children: any }) => <Box>
  <Grid container sx={{flexGrow: 1}}>
    <Grid xs={2} />
    <Grid xs={10}>
        <Box width={'100%'} alignItems={'right'}>
            <Sheet sx={{ textAlign: 'left', padding: 2, marginRight:2,  borderRadius: 4, boxShadow: ' 1px 1px 3px 0px rgba(0,0,0,0.1)', backgroundColor: '#51719B', color: 'white', ':hover': { backgroundColor: '#1D497F' } }}>
                {children}
            </Sheet>
            </Box>
            </Grid>
    </Grid>

</Box>
export default UserBubble;
