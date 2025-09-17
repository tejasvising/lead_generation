import React from 'react';
import Box from '@mui/material/Box';
 
export default function Lumyn() {
    return (
<Box
            sx={{
                display: "flex",
                height: "85vh",
                overflow: "hidden"
            }}
>
<iframe
                src="https://lumyn-pilot6.newgensoftware.net/"
                title="Lumyn"
                width="100%"
                height="100%"
                scrolling="no"
                style={{ border: "none", display: "block" }}
            />
</Box>
    );
}