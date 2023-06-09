import { Grid, Typography} from '@mui/joy';
import Navbar from './navbar';
import styles from '../styles/index.module.css'


export default function Layout(props: { children: any }) {
  const { children } = props;

  return (
    <>
      <main>
        <Navbar />
        <Grid container sx={{ flexGrow: 1 }} className={styles.main} >
          <Grid xs>
          </Grid>
          <Grid xs={8} >
            {children}
          </Grid>
          <Grid xs display={'hidden'}>
          </Grid>
        </Grid>
      </main>
    </>
  );
}