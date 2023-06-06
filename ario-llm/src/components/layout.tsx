import { Grid, Typography} from '@mui/joy';
import Navbar from './navbar';


export default function Layout(props: { children: any }) {
  const { children } = props;

  const Header = () => <Typography level="h3" pt={7}>Demo GPT</Typography>
  return (
    <>
      <main>
        <Navbar />
        <Grid container sx={{ flexGrow: 1 }} >
          <Grid xs>
          </Grid>
          <Grid xs={8} >
            <Header />
            {children}
          </Grid>
          <Grid xs display={'hidden'}>
          </Grid>
        </Grid>
      </main>
    </>
  );
}