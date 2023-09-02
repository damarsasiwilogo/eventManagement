import { Box, Flex } from '@chakra-ui/react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Input, Button, FormControl, FormLabel, FormErrorMessage } from '@chakra-ui/react';
import * as Yup from 'yup';


function Register() {

    // const [users, setUsers] = useState([]);
    // const handleSubmit= (values, action) => {
    //     const newUsers = {
    //       name: values.name,
    //       email: values.email,
    //       password: values.password,
    //     }
    //     api.post("/users", newUsers).then((res) => {
    //       setUsers([...users, res.data])
    //       action.resetForm()
    //     })
    //   }

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string().email('Invalid email format').required('Email is required'),
        telepon: Yup.string().required('Phone number is required').min(8, 'Phone number must be at least 8 characters'),
        identitas: Yup.string().required('Identity number is required'),

    });


    return (
        <>
            <Box display={"flex"} flexDirection="column" bgColor="#EDEDED" ml={40} mr={40} mt={2} borderTopRadius={10}>
                <Flex justifyContent={"center"} mt={10}>
                    <Formik initialValues={{ name: '', email: '', telepon: '', identitas: ''}} validationSchema={validationSchema} >
                        <Form>
                            <Field name="name">
                                {({ field, form }) => (
                                    <Flex justifyContent={"center"} alignItems={"center"}>
                                        <FormControl isInvalid={form.errors.name && form.touched.name}>
                                            <FormLabel htmlFor="name">Name</FormLabel>
                                            <Input {...field} id="name" placeholder="Enter your name" w={400} />
                                            <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                                        </FormControl>
                                    </Flex>
                                )}
                            </Field>
                            <Field name="email">
                                {({ field, form }) => (
                                    <FormControl isInvalid={form.errors.email && form.touched.email}>
                                        <FormLabel htmlFor="email">Email</FormLabel>
                                        <Input {...field} id="email" placeholder="Enter your email" w={400} />
                                        <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>
                            <Field name="telepon">
                                {({ field, form }) => (
                                    <FormControl isInvalid={form.errors.telepon && form.touched.telepon}>
                                        <FormLabel htmlFor="telepon">Telepon</FormLabel>
                                        <Input {...field} id="telepon" placeholder="Enter your number" w={200} />
                                        <FormErrorMessage>{form.errors.telepon}</FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>
                            <Field name="identitas">
                                {({ field, form }) => (
                                    <FormControl isInvalid={form.errors.identitas && form.touched.identitas}>
                                        <FormLabel htmlFor="tel">Identitas (KTP/SIM/Paspor)</FormLabel>
                                        <Input {...field} id="identitas" placeholder="Enter your identity number" w={300} />
                                        <FormErrorMessage>{form.errors.identitas}</FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>
                            
                        
                        </Form>
                    </Formik>
                </Flex>
            </Box>
        </>
    );
}

export default Register;
