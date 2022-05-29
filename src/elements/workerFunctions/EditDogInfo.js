import * as React from 'react';
import { Grid, TextField, Chip, CircularProgress, Button, Paper, CardMedia } from '@mui/material'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { observer } from 'mobx-react-lite'
import { dogDetails } from '../../mobx/dog';
import DescriptionChip from '../general/DescriptionChip';
import { useNavigate } from 'react-router-dom';

import { editDogInfo } from '../../mobx/workerFunctions';
import { editDog } from '../../axios/dogAPI';
import { loginout } from '../../mobx/account';


export default observer(() => {
    const pusher = useNavigate()
    React.useEffect(() => {
        !!!loginout.isCharityWorker() && pusher("/")
    })

    const [wait, setWait] = React.useState(false)
    const [name, setName] = React.useState(editDogInfo.name)
    const [breed, setBreed] = React.useState(editDogInfo.breed)
    const [dob, setdob] = React.useState(editDogInfo.dob)
    const [gender, setGender] = React.useState(editDogInfo.gender)
    const [location, setLocation] = React.useState(editDogInfo.location)
    const [description, setDescription] = React.useState(editDogInfo.description)
    const [image, setImage] = React.useState(editDogInfo.image);


    const GenderSelect = () => {
        const handleChange = (event) => {
            setGender(event.target.value);
        };

        return (
            <div>
                <FormControl variant="outlined" sx={{ width: '100%' }}>
                    <InputLabel id="gender-select-label">Gender</InputLabel>
                    <Select
                        disabled={wait}
                        labelId="gender-select-label"
                        value={gender}
                        onChange={handleChange}
                        label="Gender"
                    >
                        <MenuItem value={0}>Female</MenuItem>
                        <MenuItem value={1}>Male</MenuItem>
                    </Select>
                </FormControl>
            </div>
        );
    }

    const LocationSelect = () => {
        const handleChange = (event) => {
            setLocation(event.target.value);
        };
        const locations = ["Hong Kong Center", "Sha Tin Center", "Lam Tin Center", "Chai Wan Center"]

        return (
            <div>
                <FormControl variant="outlined" sx={{ width: '100%' }}>
                    <InputLabel id="location-select-label">Location</InputLabel>
                    <Select
                        disabled={wait}
                        labelId="location-select-label"
                        value={location}
                        onChange={handleChange}
                        label="Location"
                    >
                        {locations.map((x, i) =>
                            <MenuItem value={x} key={i}>{x}</MenuItem>
                        )}
                    </Select>
                </FormControl>
            </div>
        );
    }

    const getImage = (file) => {
        return new Promise((resolve, reject) => {
            const fr = new FileReader()
            fr.readAsDataURL(file)
            fr.onload = () => resolve(fr.result)
            fr.onerror = err => reject(err)
        })
    }

    const onImageChage = (evt) => {
        const file = evt.target.files[0]
        getImage(file).then((res) => {
            setImage(res)
            console.log(res)
        })
    }

    const onEdit = () => {
        setWait(true)
        console.log(JSON.stringify(editDogInfo))
        editDog({
            id: editDogInfo.id,
            name: name,
            breed: breed,
            dob: dob,
            gender: gender,
            location: location,
            description: description,
            image: image,
            token: loginout.getAPItoken()
        }).then(() => {
            setTimeout(() => {
                setWait(false)
                pusher("/")
            }, 1000)
        })
    }

    return (
        <div style={{ padding: 25 }}>
            <Grid container spacing={3}>
                <Grid item xs={3}>
                    <Button component="label" style={{ height: '100%', width: '100%', opacity: wait ? 0.4 : 1 }} disabled={wait}>
                        <CardMedia
                            height="450"
                            component="img"
                            image={image}
                        />
                        <input type="file" accept='image/*' hidden onChange={onImageChage} />
                    </Button>
                </Grid>
                <Grid item xs={7}>
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <TextField
                                disabled={wait}
                                label="Name"
                                style={{ width: '100%' }}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <TextField
                                disabled={wait}
                                label="Breed"
                                style={{ width: '100%' }}
                                value={breed}
                                onChange={(e) => setBreed(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                disabled={wait}
                                label="dob"
                                style={{ width: '100%' }}
                                value={dob}
                                onChange={(e) => setdob(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <GenderSelect />
                        </Grid>
                        <Grid item xs={12}>
                            <LocationSelect />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                disabled={wait}
                                label="Description"
                                style={{ width: '100%' }}
                                value={description} multiline rows={5}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            {wait ?
                                <CircularProgress size={25} />
                                :
                                <Button variant="contained" onClick={onEdit}>
                                    Edit
                                </Button>
                            }
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
})