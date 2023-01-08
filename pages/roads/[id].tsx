import { Box, FormControl, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material"
import { useState } from "react"
import { RoadImage, Route } from "./data/types";
import Grid from '@mui/material/Unstable_Grid2';
import ImageModal from "../../comps/modal/ImageModal";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { GetStaticPathsResult, GetStaticPropsContext, GetStaticPropsResult } from "next";
import {HIGHWAY6} from './data/routes'
import reverse from "../../helpers/array/reverse";

type Props = {
    route: Route
}

export default function Road({ route }: Props) {
    const [start, setStart] = useState(route.start)
    const [end, setEnd] = useState(route.end)

    const handleChange = (event: SelectChangeEvent) => {
        const selelctedStart = event.target.value
        setStart(selelctedStart);
        if (selelctedStart === route.start) {
            setEnd(route.end)
        } else {
            setEnd(route.start)
        }
    };

    let imageList: RoadImage[] = route.roadImages
    if (end !== route.end) {
        imageList = reverse(imageList)
    }

    return <>
        <Box>
            <Grid container alignItems="center" justifyContent="center" sx={{ textAlign: 'center' }} columns={3}>
                <Grid xs={1}>
                    <Typography variant="overline"> From </Typography>
                </Grid>
                <Grid xs={1}></Grid>
                <Grid xs={1}>
                    <Typography variant="overline"> To </Typography>
                </Grid>

                <Grid xs={1}>
                    <FormControl sx={{ m: 1 }}>
                        <Select
                            value={start}
                            onChange={handleChange}
                        >
                            <MenuItem value={route.start}>{route.start}</MenuItem>
                            <MenuItem value={route.end}>{route.end}</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid xs={1}>
                    <ArrowForwardIcon />
                </Grid>
                <Grid xs={1}>
                    <Typography> {end} </Typography>
                </Grid>

            </Grid>
        </Box>
        <Box sx={{ textAlign: "center" }}>

            <Grid container spacing={1}>
                {imageList.map((item, idx) => {
                    return (
                        <Grid key={item.imgSrc} xs={item.isSign ? 12 : 6}>
                            <ImageModal>
                                <img
                                    src={`${item.imgSrc}?w=2408`}
                                    alt={item.name}
                                    style={{ maxWidth: "100%" }}

                                />
                                <Typography>{idx + 1}. {item.name}</Typography>
                            </ImageModal>
                        </Grid>
                    );
                })}
            </Grid>

        </Box>
    </>
}

type PathParams = {
    id: string;
}

export const getStaticPaths = async ({ }): Promise<
    GetStaticPathsResult<PathParams>
> => {
    return {
        paths: [
            routeParam('us6')
        ],
        fallback: false,
    }
}

export async function getStaticProps({ params }: GetStaticPropsContext<PathParams>): Promise<GetStaticPropsResult<Props>> {
    return {
        props: {
            route: HIGHWAY6
        },
    };
}

function routeParam(id: string) {
    return { params: { id } }
}

const DEFAULT = 'us6'