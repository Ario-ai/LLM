import styles from '../styles/index.module.css'
import { useEffect, useState } from 'react';
import { Input, Sheet, Button, Stack } from '@mui/joy';

const BotBubble = ({ children }: { children: any }) => <Sheet sx={{ backgroundColor: 'blue', color: 'white', ':hover': { backgroundColor: 'navy' } }}>{children}</Sheet>
export default BotBubble;
