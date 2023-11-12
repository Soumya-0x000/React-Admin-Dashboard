import { Box, Button, Checkbox, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../Components/Header";
import { useTheme } from "@emotion/react";
import { tokens } from "../../Theme";
import { useState } from "react";

const initialValues = {
	firstName: '',
	lastName: '',
	email: '',
	contact: '',
	address1: '',
	address2: '',
}

const phoneRegExp = /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const userSchema = yup.object().shape({
	firstName: yup
		.string()
		.min(2, 'Too short!')
		.max(50, 'Too long!')
		.required('required'),
	lastName: yup
		.string()
		.min(2, 'Too short!')
		.max(50, 'Too long!')
		.required('required'),
	email: yup.string().email('invalid email').required('required'),
	contact: yup
		.string()
		.matches(phoneRegExp, 'Phone no is not valid')
		.required('required'),
	address1: yup.string().required('required'),
	address2: yup.string().required('required'),
})

const Form = () => {
	const theme = useTheme()
	const colors = tokens(theme.palette.mode)

	const isNonMobile = useMediaQuery("(min-width: 600px)");

	const handleFormSubmit = (values) => {
		console.log(values);
	};

	const handleClearForm = (resetForm) => {
		resetForm();
	};
	  
	const inputFieldContents = [
		{label:'First Name', title:'firstName', span: 2},
		{label:'Last Name', title:'lastName', span: 2},
		{label:'Email', title:'email', span: 4},
		{label:'Contact', title:'contact', span: 4},
		{label:'Address 1', title:'address1', span: 2},
		{label:'Address 2', title:'address2', span: 2},
	]

	const [copyAddress, setCopyAddress] = useState(false)

    return (
        <div className='mt-5 space-y-10'>
            <div className="ml-2">
                <Header title={'CREATE USER'} subtitle={'Create a new user profile'}/>
            </div>

            <div className="mx-5">
				<Formik
				onSubmit={handleFormSubmit}
				initialValues={initialValues}
				validationSchema={userSchema}>
					{({values, errors, touched, handleBlur, handleChange, handleSubmit, resetForm}) => (
						<form onSubmit={handleSubmit}>
							<Box 
							display='grid' 
							gap='30px'
							gridTemplateColumns='repeat(4, minmax(0, 1fr))'
							sx={{ "& > div": {gridColumn: isNonMobile ? undefined : "span 4"} }}>
								{inputFieldContents.map((item, index) => (
									<TextField
									key={index}
									fullWidth
									variant='filled'
									type={'text'}
									label={item.label}
									onBlur={handleBlur}
									onChange={handleChange}
									value={values[item.title]}
									name={item.title}
									error={!!touched[item.title] && !!errors[item.title]}
									helperText={touched[item.title] && errors[item.title]}
									sx={{
										gridColumn: `span ${item.span}`, 
										color: colors.greenAccent[200],
										"& label": {
											color: colors.blueAccent[200]
										},
										"& label.Mui-focused": {
											color: colors.greenAccent[200]
										},
										"& input": {
											backgroundColor: colors.blueAccent[800]
										}
									}}/>
								))}	
							</Box>

							<div className='flex justify-between gap-x-10 mt-5'>
								<Box 
								sx={{ 
									color: colors.blueAccent[200],
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center', 
								}}>
									<Checkbox 
										checked={copyAddress}
										onClick={() => (
											setCopyAddress(!copyAddress),
											!copyAddress ? (values.address2 = values.address1) : (values.address2 = '')
										)}
										sx={{
											color: colors.blueAccent[300], 
											scale: '1.3',
											"&.Mui-checked": { color: colors.blueAccent[300] }
										}}
									/>
									
									<label className="text-[1rem] hidden md:block">Both addresses are same</label>
									<label className="text-[1rem] block md:hidden">Same address</label>
								</Box>

								<div className="flex flex-col gap-y-3 md:flex-row md:gap-x-4">
									<Button 
									variant='contained' 
									sx={{
										backgroundColor: colors.greenAccent[700], 
										color: colors.greenAccent[100],
										fontWeight: 'bold',
										":hover": { 
											backgroundColor: colors.blueAccent[600], 
											color: colors.greenAccent[100]
										}
									}}
									onClick={() => handleClearForm(resetForm)}>
										Reset Form
									</Button>

									<Button 
									type='submit' 
									variant='contained'
									sx={{
										backgroundColor: colors.greenAccent[700], 
										color: colors.greenAccent[100],
										fontWeight: 'bold',
										'&:hover': {
											backgroundColor: colors.blueAccent[600],
											color: colors.greenAccent[100]
										}
									}}>
										Create New User
									</Button>
								</div>
							</div>
						</form>
					)}
				</Formik>	
            </div>
        </div>
    )
}

export default Form