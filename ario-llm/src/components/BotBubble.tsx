'use client'
import {useState} from 'react'
import { Sheet, Grid, Box, Button, Divider } from '@mui/joy';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
const BotBubble = ({ children, context }: { children: any, context?: Array<any> }) => {

    const [show, setShow] = useState<boolean>(false)

return <Box>
    <Grid container sx={{ flexGrow: 1 }}>
        <Grid xs={1}>
            <Box display={'flex'} justifyContent={'center'}>
                <img
                    style={{ backgroundColor: 'inherit', padding: 5 }}
                    src={'/botIcon.svg'}
                    alt={'bot'}
                    height={35}
                /></Box>
        </Grid>
        <Grid xs={10}>
            <Sheet sx={{ padding: 2, borderRadius: 4, backgroundColor: 'white',border: '2px solid #fff', boxShadow: ' 1px 1px 3px 0px rgba(0,0,0,0.1)',  color: 'black', ':hover': { border: '2px solid #1D497F' } }}>
                {children}
                {context && <><Box display={'flex'} justifyContent={'left'}>
                    <Box margin={'auto 0'}>View References</Box>
                    <Divider />
                    {show ? <Box sx={{height: '20px !important'}} onClick={() => setShow(false)}><KeyboardArrowDownIcon /></Box> : <Box sx={{height: '20px !important'}} onClick={() => setShow(true)}><ChevronRightIcon /></Box> }
                </Box>
                {show && context.map(c => <>
                <Box><b>{c.metadata.document}</b></Box>
                <Box mb={2}>"{c.page_content}"</Box>
                </>)}</>}
            </Sheet>
        </Grid>
    </Grid>
</Box>
}
export default BotBubble;
