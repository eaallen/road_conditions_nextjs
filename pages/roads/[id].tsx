import { Box, FormControl, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material"
import { useState } from "react"
import { RoadImage, Route } from "../../data/types";
import Grid from '@mui/material/Unstable_Grid2';
import ImageModal from "../../comps/modal/ImageModal";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { GetStaticPathsResult, GetStaticPropsContext, GetStaticPropsResult } from "next";
import routes, { RoutesMap } from "../../data/routes";

type Props = {
    route: Route
}

export default function Road({ route }: Props) {
    const commonRoadIamges = route.roadImages.filter(x => x.commonName !== undefined)

    const [start, setStart] = useState(commonRoadIamges[0].name)
    const [end, setEnd] = useState(commonRoadIamges[commonRoadIamges.length - 1].name)

    const handleChange = (event: SelectChangeEvent) => {
        const selelctedStart = event.target.value
        setStart(selelctedStart);
    };

    const changeEnd = (event: SelectChangeEvent) => {
        setEnd(event.target.value)
    }

    const imageList: RoadImage[] = makeRoute(route.roadImages, start, end)

    return <>
        <Box>
            <Typography align="center" variant="h3">{route.name}</Typography>
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
                            sx={{ width: 120 }}
                        >
                            {commonRoadIamges.map(x => (
                                <MenuItem key={x.imgSrc} value={x.name}>{x.commonName ?? x.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid xs={1}>
                    <ArrowForwardIcon />
                </Grid>
                <Grid xs={1}>
                    <FormControl sx={{ m: 1 }}>
                        <Select
                            value={end}
                            onChange={changeEnd}
                            sx={{ width: 100 }}
                        >
                            {commonRoadIamges.map(x => (
                                <MenuItem key={x.imgSrc} value={x.name}>{x.commonName ?? x.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
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
                                    src={`${item.imgSrc}`}
                                    alt={item.name}
                                    style={{ maxWidth: "100%" }}
                                />
                                {item.commonName && item.commonName !== "" ? <>
                                    <Typography>{idx + 1}. {item.commonName}</Typography>
                                    <Typography variant="caption">{item.name}</Typography>
                                </> :
                                    <Typography>{idx + 1}. {item.name}</Typography>}

                            </ImageModal>
                        </Grid>
                    );
                })}
            </Grid>
        </Box>
    </>
}

function makeRoute(roadImages: RoadImage[], start: string, end: string) {
    const route: RoadImage[] = []
    const startidx = roadImages.findIndex(x => x.name === start)
    const endidx = roadImages.findIndex(x => x.name === end)

    if (startidx < endidx) {
        for (let i = startidx; i <= endidx; i++) {
            route.push(roadImages[i])
        }
    } else {
        for (let i = endidx; i <= startidx; i++) {
            route.unshift(roadImages[i])
        }
    }
    return route
}

type PathParams = {
    id: keyof RoutesMap;
}

export const getStaticPaths = async ({ }): Promise<
    GetStaticPathsResult<PathParams>
> => {
    return {
        paths: [
            routeParam('us6'),
            routeParam('i15'),
        ],
        fallback: false,
    }
}

export async function getStaticProps({ params }: GetStaticPropsContext<PathParams>): Promise<GetStaticPropsResult<Props>> {
    const props = {
        route: routes[params?.id ?? 'us6']
    }
    console.log("----------_>", props)
    return { props };
}

function routeParam(id: keyof RoutesMap) {
    return { params: { id: id } }
}
