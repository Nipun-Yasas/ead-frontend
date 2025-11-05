import { motion } from "framer-motion";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";

interface StatCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  color: string;
}

export default function StatCard({ title, value, icon, color }: StatCardProps) {
  const theme = useTheme();

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      style={{ height: "100%", width: "100%" }}
    >
      <Card
        elevation={10}
        sx={{
          textAlign: "center",
          p: { xs: 2, sm: 2.5, md: 3 },
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          position: "relative",
          zIndex: 1,
          backdropFilter: "blur(10px) saturate(1.08)",
          WebkitBackdropFilter: "blur(10px) saturate(1.08)",
          borderRadius: 3,
          transition:
            "background-color 200ms ease, backdrop-filter 200ms ease, box-shadow 200ms ease",
          "&:hover": {
            boxShadow: `0 8px 25px ${color}33`,
          },
        }}
        role="region"
        aria-label={title}
      >
        <Box>
          <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
            {icon}
          </Box>

          <Typography
            component="div"
            sx={{
              fontSize: { xs: 28, sm: 34, md: 40, lg: 44 },
              fontWeight: 800,
              lineHeight: 1,
              mb: 1,
              color: color,
            }}
          >
            {value}
          </Typography>

          <Typography
            component="div"
            sx={{
              fontSize: { xs: 10, sm: 11, md: 12 },
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: 0.6,
              color: "text.secondary",
            }}
          >
            {title}
          </Typography>
        </Box>
      </Card>
    </motion.div>
  );
}