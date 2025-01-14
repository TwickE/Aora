import { View, Text, ScrollView, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import FormField from '../../components/FormField'
import { useState } from 'react'
import CustomButton from '../../components/CustomButton'
import { Link } from 'expo-router'
import { createUser } from '../../lib/appwrite'
import { Alert } from 'react-native'
import { router } from 'expo-router';
import { useGlobalContext } from "../../context/GlobalProvider";

const SignUp = () => {
    const [form, setform] = useState({
        userName: '',
        email: '',
        password: ''
    })
    const [isSubmmiting, setIsSubmmiting] = useState(false)
    const { setUser, setIsLoggedIn } = useGlobalContext();

    const submit = async () => {
        if(!form.userName || !form.email || !form.password) {
            Alert.alert('Error', 'Please fill in all fields')
            return
        }

        setIsSubmmiting(true)

        try {
            const result = await createUser(form.email, form.password, form.userName)
            setUser(result)
            setIsLoggedIn(true)

            router.replace('/home')
        } catch (error) {
            Alert.alert('Error', error.message)
        } finally {
            setIsSubmmiting(false)
        }
    }

    return (
        <SafeAreaView className="bg-primary h-full">
            <ScrollView contentContainerStyle={{height: '100%'}}>
                <View className="w-full h-full justify-center px-4 pb-20">
                    <Image
                        source={images.logo}
                        resizeMode='contain'
                        className="w-[115px] h-[35px]"
                    />
                    <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">Sign up to Aora</Text>
                    <FormField
                        title='Username'
                        value={form.userName}
                        handleChangeText={(e) => setform({...form, userName: e})}
                        otherStyles="mt-10"
                    />
                    <FormField
                        title='Email'
                        value={form.email}
                        handleChangeText={(e) => setform({...form, email: e})}
                        otherStyles="mt-7"
                        keyboardType='email-address'
                    />
                    <FormField
                        title='Password'
                        value={form.password}
                        handleChangeText={(e) => setform({...form, password: e})}
                        otherStyles="mt-7"
                    />
                    <CustomButton
                        title="Sign Up"
                        handlePress={submit}
                        containerStyles="mt-7"
                        isLoading={isSubmmiting}
                    />
                    <View className="justify-center pt-5 flex-row gap-2">
                        <Text className="text-lg text-gray-100 font-pregular">Have an account already?</Text>
                        <Link href="/sign-in" className='text-lg font-psemibold text-secondary'>Sing In</Link>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default SignUp