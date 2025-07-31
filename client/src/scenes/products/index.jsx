import React, {useState} from 'react'
import {Box, Typography, useTheme, Card, CardActions, CardContent, Collapse, Button, Rating, useMediaQuery} from '@mui/material';
import {useGetProductsQuery} from 'state/api';
import Header from 'components/Header';
const Product=({
    _id,
    name,
    description,
    price,
    rating,
    category,
    supply,
    stat
})=>{
    const theme= useTheme();
    const [expanded, setExpanded] = useState(false);
    return(
        <Card sx={{ backgroundColor: theme.palette.background.alt, borderRadius:"0.55rem" }}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color={theme.palette.secondary[700]} gutterBottom>
                    {category}
                </Typography>
                <Typography variant="h5" component="div">
                    {name}
                </Typography>
                <Typography sx={{ mb: "1.5rem" }} color={theme.palette.secondary[400]}>
                    ${Number(price).toFixed(2)}
                </Typography>
                <Rating value={rating} readOnly />
                <Typography variant="body2" color={theme.palette.secondary[300]}>
                    {description}
                </Typography>
                <CardActions>
                    <Button variant='primary' size="small" onClick={() => setExpanded(!expanded)}>
                        {expanded ? "Show Less" : "Show More"}
                    </Button>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit sx={{color: theme.palette.secondary[300]}}>
                    <Box sx={{ marginTop: "15px" }}>
                        <Typography>Id: {_id}</Typography>
                        <Typography>Supply Left: {supply}</Typography>
                        <Typography>Yearly Sales This Year: {stat.yearlySalesTotal}</Typography>
                        <Typography>Yearly Units Sold This Year: {stat.yearlyTotalSoldUnits}</Typography>
                    </Box>
                </Collapse>
            </CardContent>
        </Card>
    )
}
const Products = () => {
    const {data, isLoading} = useGetProductsQuery();   
    const isNonMobile = useMediaQuery("(min-width: 1000px)"); 
  return (
    <Box m="1.5rem 2.5rem">
        <Header title="PRODUCTS" subtitle="See your list of products." />
        {
            isLoading ? (
                <Typography>Loading...</Typography>
            ) : (
                <Box
                    display="grid"
                    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                    gap="1.5rem"
                    mt="20px"
                    justifyContent="space-between"
                    rowGap="20px"
                    columnGap="1.33%"
                    sx={{
                        "& > div": { gridColumn: isNonMobile ? undefined : "span 4" }
                    }}
                >
                    {data.map((
                        {_id,
                        name,
                        description,
                        price,
                        rating,
                        category,
                        supply,
                        stat}
                    )=>(
                        <Product
                            key={_id}
                            _id={_id}
                            name={name}
                            description={description}
                            price={price}
                            rating={rating}
                            category={category}
                            supply={supply}
                            stat={stat} // Assuming stat is an array and we want the first element
                        />
                    ))}
                </Box>
            )
        }
    </Box>
  )
}

export default Products