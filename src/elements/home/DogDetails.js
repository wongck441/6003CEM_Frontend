import * as React from 'react';
import { Grid, Typography, Chip, IconButton, Button, Paper, CardMedia } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { dogDetails } from '../../mobx/dog';
import DescriptionChip from '../general/DescriptionChip';

export default observer(() => {

    return (
        <div style={{ padding: 25 }}>
            <Grid container spacing={3}>
                <Grid item xs={3}>
                    <CardMedia
                        component="img"
                        image={dogDetails.image}
                    />
                </Grid>
                <Grid item xs={7}>
                    <div>
                        <Chip
                            label={`Name: ${dogDetails.name}`}
                            variant="outlined"
                            color="primary"
                            style={{
                                margin: 15
                            }}
                        />
                        <Chip
                            label={`Breed: ${dogDetails.breed}`}
                            variant="outlined"
                            color="primary"
                            style={{
                                margin: 15,
                                textTransform: 'capitalize'
                            }}
                        />
                        <Chip
                            label={`Birthday: ${dogDetails.dob}`}
                            variant="outlined"
                            color="primary"
                            style={{
                                margin: 15
                            }}
                        />
                        <Chip
                            label={`Gender: ${dogDetails.gender === 0 ? "Female" : "Male"}`}
                            variant="outlined"
                            color="primary"
                            style={{
                                margin: 15
                            }}
                        />
                        <Chip
                            label={`Location: ${dogDetails.location}`}
                            variant="outlined"
                            color="primary"
                            style={{
                                margin: 15,
                                textTransform: 'capitalize'
                            }}
                        />
                    </div>
                    <div style={{ paddingLeft: 15 }}>
                        <DescriptionChip data={`Description: ${dogDetails.description}`} />
                    </div>
                </Grid>
            </Grid>
        </div>
    )
})