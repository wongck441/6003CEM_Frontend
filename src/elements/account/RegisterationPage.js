import * as React from 'react'
import { Button, TextField, Grid, CardMedia } from '@mui/material'
import { registerAPI } from '../../axios/accountAPI'
import { useNavigate } from 'react-router-dom'
import { loginout } from '../../mobx/account'

const Register = () => {
    const pusher = useNavigate()
    React.useEffect(() => {
        loginout.isLogedIn() && pusher("/")
    })
    
    const [user, setUser] = React.useState("")
    const [pwd, setPwd] = React.useState("")
    const [confirmPwd, setConfirmPwd] = React.useState("")
    const [firstName, setFirstName] = React.useState("")
    const [lastName, setLastName] = React.useState("")
    const [email, setEmail] = React.useState("")
    const [avatar, setAvatar] = React.useState("")

    const getImage = (file) => {
        return new Promise((resolve, reject) => {
            const fr = new FileReader()
            fr.readAsDataURL(file)
            fr.onload = () => resolve(fr.result)
            fr.onerror = err => reject(err)
        })
    }

    const handleUploadAvatar = (evt) => {
        const file = evt.target.files[0]
        getImage(file).then((res) =>
            setAvatar(res)
        )
    }

    const handleRegister = () => {
        registerAPI({
            username: user,
            password: pwd,
            firstName: firstName,
            lastName: lastName,
            email: email,
            avatar: avatar
        }).then(() =>
            // return login home
            pusher("/")
        )
    }

    return (
        <div style={{ padding: 25 }}>
            <Grid container spacing={3} style={{ width: '50%' }}>
                <Grid item xs={6}>
                    <TextField
                        type="text" vlalue={firstName} variant="filled"
                        onChange={(evt) => setFirstName(evt.target.value)}
                        label="First Name" style={{ width: '100%' }}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        type="text" vlalue={lastName} variant="filled"
                        onChange={(evt) => setLastName(evt.target.value)}
                        label="Last Name" style={{ width: '100%' }}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        type="text" vlalue={email} variant="filled"
                        onChange={(evt) => setEmail(evt.target.value)}
                        label="Email Address" style={{ width: '100%' }}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        type="text" vlalue={user} variant="filled"
                        onChange={(evt) => setUser(evt.target.value)}
                        label="Username" style={{ width: '100%' }}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        type="password" vlalue={pwd} variant="filled"
                        onChange={(evt) => setPwd(evt.target.value)}
                        label="Password" style={{ width: '100%' }}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        type="password" vlalue={confirmPwd} variant="filled"
                        onChange={(evt) => setConfirmPwd(evt.target.value)}
                        label="Confirm Password" style={{ width: '100%' }}
                    />
                </Grid>
                <Grid item xs={12}>
                    {avatar !== "" &&
                        <CardMedia
                            component="img"
                            image={avatar}
                            alt="Avatar"
                            style={{
                                margin: '15px 0'
                            }}
                        />
                    }
                    <Button component="label" variant="contained" style={{ width: '100%' }}>
                        Upload Avatar
                        <input
                            type="file" hidden
                            accept='image/*'
                            onChange={handleUploadAvatar}
                        />
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <Button 
                        variant="outlined" style={{ width: '100%' }} 
                        onClick={handleRegister}
                        disabled={
                            user === "" || pwd === "" || firstName === "" ||  lastName === "" ||
                            email === "" || avatar === "" || pwd !== confirmPwd
                        }
                    >
                        Register
                    </Button>
                </Grid>
            </Grid>
        </div>
    )
}

export default Register