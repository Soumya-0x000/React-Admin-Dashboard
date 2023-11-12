import React from 'react'
import Header from '../../Components/Header'
import StatBox from '../../Components/StatBox'
import { Box, Button, IconButton, Typography, useTheme } from '@mui/material'
import { tokens } from '../../Theme'
import { DownloadOutlined, Email, PersonAddAlt1TwoTone, PointOfSaleTwoTone, TrafficTwoTone } from '@mui/icons-material'
import LineChart from '../../Components/LineChart'
import BarChart from '../../Components/BarChart'
import { TotalValue, mockTransactions } from '../../data/mockData'
import ProgressCircle from '../../Components/ProgressCircle'
import GeographyChart from '../../Components/GeographyChart'

const Dashboard = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const statBoxData = [
        {title: '456,893', subtitle: 'Emails Sent', span: 'span 4', progress: '0.45', increase: '+14%', icon: <Email sx={{ color: colors.greenAccent[500], fontSize: "26px", scale: '1.1' }}/>},
        {title: '4565,987', subtitle: 'Sales Obtained', span: 'span 4', progress: '0.65', increase: '+28%', icon: <PointOfSaleTwoTone sx={{ color: colors.greenAccent[500], fontSize: "26px", scale: '1.1' }}/>},
        {title: '24,693', subtitle: 'New Clients', span: 'span 4', progress: '0.25', increase: '+10%', icon: <PersonAddAlt1TwoTone sx={{ color: colors.greenAccent[500], fontSize: "26px", scale: '1.1' }}/>},
        {title: '2,458,694', subtitle: 'Traffic Received', span: 'span 4', progress: '0.82', increase: '+43%', icon: <TrafficTwoTone sx={{ color: colors.greenAccent[500], fontSize: "26px", scale: '1.1' }}/>},
    ]

    return (
        <div className='mx-3 mt-3 flex flex-col justify-between'>
            <div className='flex items-center justify-between mb-1'>
                <Header title={"DASHBOARD"} subtitle={"Welcome to your dashboard"}/>

                <Box>
                    <Button
                    sx={{
                        backgroundColor: colors.blueAccent[700],
                        color: colors.grey[100],
                        fontSize: '14px',
                        fontWeight: 'bold',
                        padding: '10px 20px',
                        ":hover": {backgroundColor: colors.blueAccent[600]}
                    }}>
                        <DownloadOutlined sx={{mr: '10px'}}/>
                        Download Reports
                    </Button>
                </Box>
            </div>

            {/* Grid and charts */}
            <Box 
            display='grid'
            gridTemplateColumns='repeat(16, 1fr)'
            gridAutoRows='140px'
            gap='12px'
            mt='10px'>
                
                {/* Row 1 */}
                {statBoxData.map((data, i) => (
                    <Box 
                    key={i}
                    gridColumn={data.span}
                    backgroundColor={colors.primary[400]}
                    borderRadius={'6px'}
                    display='flex'
                    alignItems='center'
                    justifyContent='center'
                    sx={{
                        transition: 'transform 0.2s ease-in-out',
                        '&:hover': {
                            transform: 'scale(1.04)',
                        },
                    }}>
                        {
                            <StatBox 
                                title={data.title}
                                subtitle={data.subtitle}
                                progress={data.progress}
                                increase={data.increase}
                                icon={data.icon}
                            />
                        }
                    </Box>
                ))}

                {/* Row 2 */}
                {/* LineChart */}
                <Box 
                gridColumn='span 10'
                gridRow='span 2'
                borderRadius='6px'
                backgroundColor={colors.primary[400]}>
                    <Box 
                    mt='24px'
                    p='0 30px'
                    display='flex'
                    alignItems='center'
                    justifyContent='space-between'>
                        <Box>
                            <Typography
                            variant='h5'
                            fontWeight='600'
                            color={colors.grey[100]}>
                                Revenue Generated
                            </Typography>

                            <Typography 
                            variant='h3'
                            fontWeight='bold'
                            color={colors.greenAccent[500]}>
                                $<TotalValue/>
                            </Typography>
                        </Box>

                        <Box>
                            <IconButton>
                                <DownloadOutlined 
                                sx={{ 
                                    color: colors.greenAccent[500], 
                                    fontSize: "26px", 
                                    scale: '1.1' 
                                }}/>
                            </IconButton>
                        </Box>
                    </Box>

                    <div className='h-[250px] -mt-[20px] relative'>
                        <LineChart isDashboard={true}/>
                    </div>
                </Box>
                
                {/* Transactions */}
                <Box 
                gridColumn='span 6'
                gridRow='span 2'
                borderRadius='6px'
                backgroundColor={colors.primary[400]}
                overflow='auto'>
                    <Box
                    display='flex'
                    justifyContent='start'
                    alignItems='center'
                    borderBottom={`4px solid ${colors.primary[500]}`}
                    p='15px'>
                        <Typography variant='h5' color={colors.grey[100]} fontWeight='600'>
                            Recent Transactions
                        </Typography>
                    </Box>

                    {mockTransactions.map((transaction, i) => (
                        <Box 
                        key={`${transaction.txId}-${i}`}
                        display='flex'
                        justifyContent='space-between'
                        alignItems='center'
                        borderBottom={`4px solid ${colors.primary[500]}`}
                        p='15px'>
                            <Box>
                                <Typography
                                color={colors.greenAccent[500]}
                                variant="h5"
                                fontWeight="600">
                                    {transaction.txId}
                                </Typography>

                                <Typography color={colors.grey[100]}>
                                    {transaction.user}
                                </Typography>
                            </Box>

                            <Box color={colors.grey[100]}>{transaction.date}</Box>

                            <Box 
                            backgroundColor={colors.greenAccent[500]}
                            fontWeight='bold'
                            fontSize='.95rem'
                            color={colors.greenAccent[800]}
                            p='5px 10px'
                            borderRadius='4px'>
                                ${transaction.cost}
                            </Box>
                        </Box>
                    ))}
                </Box>

                {/* Row 3 */}
                <Box 
                gridColumn='span 4'
                gridRow='span 2'
                backgroundColor={colors.primary[400]}
                borderRadius='6px'
                position='relative'>
                    <Box 
                    mt='10px'
                    p='0 30px'
                    display='flex'
                    alignItems='center'>
                        <Box>
                            <Typography
                            variant='h5'
                            fontWeight='600'
                            color={colors.grey[100]}
                            position='absolute'
                            left='1.5rem'
                            top='1rem'>
                                Campaign
                            </Typography>
                        </Box>
                    </Box>

                    <div className='h-full w-full absolute top-9'>
                        <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        mt="25px">
                            <ProgressCircle progress={'0.45'} size='145'/>

                            <Typography
                            variant="h5"
                            color={colors.greenAccent[500]}
                            sx={{ mt: "15px", mb: '8px' }}>
                                $48,352 revenue generated
                            </Typography>
                            
                            <Typography>Includes extra misc expenditures and costs</Typography>
                        </Box>
                    </div>
                </Box>

                {/* BarChart */}
                <Box 
                gridColumn='span 8'
                gridRow='span 2'
                borderRadius='6px'
                backgroundColor={colors.primary[400]}
                position='relative'>
                    <Box 
                    mt='10px'
                    p='0 30px'
                    display='flex'
                    alignItems='center'>
                        <Box>
                            <Typography
                            variant='h5'
                            fontWeight='600'
                            color={colors.grey[100]}
                            position='absolute'
                            left='1.5rem'
                            top='1rem'>
                                Sales Quantity
                            </Typography>
                        </Box>
                    </Box>

                    <div className='h-full w-full absolute top-3'>
                        <BarChart isDashboard={true}/>
                    </div>
                </Box>

                {/* Map */}
                <Box 
                gridColumn='span 4'
                gridRow='span 2'
                borderRadius='6px'
                backgroundColor={colors.primary[400]}
                position='relative'>
                    <Box 
                    mt='10px'
                    p='0 30px'
                    display='flex'
                    alignItems='center'>
                        <Box>
                            <Typography
                            variant='h5'
                            fontWeight='600'
                            color={colors.grey[100]}
                            position='absolute'
                            left='1.5rem'
                            top='1rem'>
                                Geography Based Traffic
                            </Typography>
                        </Box>
                    </Box>

                    <div className='h-full w-full absolute top-0'>
                        <GeographyChart isDashboard={true}/>
                    </div>
                </Box>
            </Box>
        </div>
    )
}

export default Dashboard