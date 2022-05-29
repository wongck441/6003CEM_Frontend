import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { dogDetails, dogInfoList } from '../../mobx/dog';
import { editDogInfo } from '../../mobx/workerFunctions';
import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router-dom';
import { Tooltip } from '@mui/material';
import CakeIcon from '@mui/icons-material/Cake';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { deleteDog } from '../../axios/dogAPI';
import { loginout } from '../../mobx/account';


const DogInfoCard = (info) => {
    const pusher = useNavigate();
    const infoData = info.info;

    const handleShowDetails = () => {
        pusher("/dogDetails")
        dogDetails.setData({
            id: infoData.id,
            name: infoData.name,
            breed: infoData.breed,
            gender: infoData.gender,
            dob: infoData.dob,
            location: infoData.location,
            description: infoData.description,
            image: infoData.image
        })
    }

    const EditButton = () => {
        const onEdit = () => {
            pusher("/charityWorker/editDogInfo")
            editDogInfo.setData({
                id: infoData.id,
                name: infoData.name,
                breed: infoData.breed,
                gender: infoData.gender,
                dob: infoData.dob,
                location: infoData.location,
                description: infoData.description,
                image: infoData.image
            })
        }

        return (
            <Button variant="contained" color="inherit" style={{ color: '#333', marginRight: 15 }} onClick={onEdit}>
                Edit
            </Button>
        )
    }

    const DeleteButton = () => {
        const onEdit = () => {
            deleteDog({
                id: infoData.id,
                token: loginout.getAPItoken()
            })
            dogInfoList.deleteDogData(info.index)
        }

        return (
            <Button variant="contained" color="inherit" style={{ color: '#fff', background: '#930000' }} onClick={onEdit}>
                Delete
            </Button>
        )
    }

    return (
        <Tooltip
            title={
                loginout.isCharityWorker() ?
                    <>
                        <EditButton />
                        <DeleteButton />
                    </>
                    :
                    ""
            }
            placement="top"
            componentsProps={{
                tooltip: {
                    sx: {
                        backgroundColor: "rgba(0,0,0,0)"
                    }
                }
            }}
        >
            <Card onClick={handleShowDetails} style={{ cursor: 'pointer', height: 600 }}>
                <CardMedia
                    component="img"
                    height="400"
                    image={infoData.image}
                    alt="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {infoData.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" style={{ height: 70 }}>
                        {infoData.description.length > 70 ?
                            `${infoData.description.substring(0, 70)}... (read more)`
                            :
                            infoData.description
                        }
                    </Typography>
                </CardContent>
                <CardActions>
                    <div style={{ padding: '0 5px' }}>
                        <Typography variant="body2" style={{ display: 'inline-block', marginRight: 10 }} color="text.secondary">
                            <CakeIcon /> <span style={{ position: 'relative', bottom: 5 }}>
                                {infoData.dob}
                            </span>
                        </Typography>
                        <Typography variant="body2" style={{ display: 'inline-block', marginRight: 10 }} color="text.secondary">
                            <LocationOnIcon /> <span style={{ position: 'relative', bottom: 5 }}>
                                {infoData.location}
                            </span>
                        </Typography>
                        <Typography variant="body2" style={{ display: 'inline-block', margin: '0 10px' }} color="text.secondary">
                            {infoData.gender === 0 ? <FemaleIcon /> : <MaleIcon />}
                        </Typography>
                    </div>
                </CardActions>
            </Card>
        </Tooltip>
    );
}

export default observer(DogInfoCard)