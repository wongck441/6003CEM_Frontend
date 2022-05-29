import * as React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { TextField, Select, MenuItem, FormControl, FormLabel, Divider, InputLabel } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import NoResultFoundIcon from '@mui/icons-material/SentimentDissatisfied';

// elements
import Dogcard from './Dogcard'

// data
import { dogInfoList } from '../../mobx/dog';

import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite'
import { loginout } from '../../mobx/account';

import { getDogs } from '../../axios/dogAPI';


export default observer(() => {
    const pusher = useNavigate()
    React.useEffect(() => {
        getDogs()
    }, [])

    const [gender, setGender] = React.useState("")
    const [location, setLocation] = React.useState("")
    const [breed, setBreed] = React.useState("")


    const locations = ["Hong Kong Center", "Sha Tin Center", "Lam Tin Center", "Chai Wan Center"]

    const handleGenderChange = (event) => {
        setGender(event.target.value);
        console.log(gender)
    };
    const handleBreedChange = (event) => {
        setBreed(event.target.value);
    }


    return (
        <div style={{ padding: 25 }}>
            <Grid container spacing={5}>
                <Grid item xs={12}>
                    <FormLabel id="demo-radio-buttons-group-label" style={{ display: 'block', marginBottom: 15, fontSize: 14 }}>Filter</FormLabel>
                    <TextField
                        size="small" label="Breed"
                        style={{ marginRight: 20 }}
                        variant="outlined" value={breed}
                        onChange={handleBreedChange}
                    />
                    <FormControl style={{ width: 250, marginRight: 25 }} size="small">
                        <InputLabel id="gender-select-label">Gender</InputLabel>
                        <Select
                            labelId="gender-select-label"
                            id="gender-select"
                            value={gender}
                            label="Gender"
                            onChange={handleGenderChange}
                        >
                            <MenuItem value={""}>None</MenuItem>
                            <MenuItem value={0}>Female</MenuItem>
                            <MenuItem value={1}>Male</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl style={{ width: 250, marginRight: 25 }} size="small">
                        <InputLabel id="location-select-label">Location</InputLabel>
                        <Select
                            labelId="location-select-label"
                            id="location-select"
                            value={location}
                            label="Location"
                            onChange={(evt) => {
                                setLocation(evt.target.value)
                            }}
                        >
                            <MenuItem value={""}>None</MenuItem>
                            {locations.map((x, i) =>
                                <MenuItem value={x} key={i}>{x}</MenuItem>
                            )}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <Divider />
                </Grid>
                {loginout.isCharityWorker() &&
                    <Grid item xs={2} md={3}>
                        <Button
                            style={{
                                width: '100%',
                                height: 600
                            }}
                            variant="outlined"
                            onClick={() => pusher("/charityWorker/addDogInfo")}
                        >
                            <Typography><AddCircleIcon /><br />Add New Dog</Typography>
                        </Button>
                    </Grid>
                }
                {dogInfoList.filter(breed, gender, location).length === 0 ?
                    <Grid item xs={9}>
                        <Button
                            style={{
                                width: '100%',
                                height: 600
                            }}
                            variant="text"
                            disabled
                        >
                            <Typography><NoResultFoundIcon /><br />No Dog Found</Typography>
                        </Button>
                    </Grid>
                    :
                    dogInfoList.filter(breed, gender, location).map((x, i) =>
                        <Grid item xs={2} md={3}>
                            <Dogcard info={x} index={i} />
                        </Grid>
                    )}

            </Grid>
        </div>
    );
})