import React from 'react'; // React kitabxanasını import edirik
import LinearProgress from '@mui/material/LinearProgress'; // MUI-nin LinearProgress komponentini import edirik
import { Box, Typography } from '@mui/material'; // MUI-nin Box və Typography komponentlərini import edirik

const ProgressBar = ({ score }) => {
  // Balın qiymətinə əsasən rəngi müəyyən edən funksiya
  const getColor = (score) => {
    if (score >= 80) return '#4CAF50'; // Yüksək bal üçün yaşıl rəng
    if (score >= 50) return '#FFEB3B'; // Orta bal üçün sarı rəng
    return '#F44336'; // Aşağı bal üçün qırmızı rəng
  };

  return (
    <Box sx={{ width: '100%', textAlign: 'center', padding: 2 }}> {/* Box komponentini istifadə edirik və mərkəzləşdiririk */}
      <LinearProgress
        variant="determinate" // Proqresin müəyyən bir dəyərdə olacağını göstəririk
        value={score} // LinearProgress komponentinə score dəyərini ötürürük
        sx={{
          height: 10, // Proqres barının hündürlüyü
          borderRadius: 5, // Künclərin yumşaldılması
          backgroundColor: '#e0e0e0', // Proqres barının arxa fonu
          '& .MuiLinearProgress-bar': {
            backgroundColor: getColor(score), // Barın rəngi balın qiymətinə əsasən dəyişir
          },
        }}
      />
      <Typography variant="h5" color={getColor(score)} mt={1}> {/* Score yazısını göstəririk */}
        {score.toFixed(1)} Ümumi bal {/* Bir ondalıklı bal ilə ümumi balı göstəririk */}
      </Typography>
    </Box>
  );
};

export default ProgressBar; // Komponenti ixrac edirik
