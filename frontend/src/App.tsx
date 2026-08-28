import { Route, Routes } from 'react-router-dom'
import { Layout } from '@/components/common/Layout'
import HomePage from '@/pages/HomePage'
import AboutPage from '@/pages/AboutPage'
import GuidePage from '@/pages/GuidePage'
import GradeGuidePage from '@/pages/GradeGuidePage'
import ProgramsPage from '@/pages/ProgramsPage'
import GalleryPage from '@/pages/GalleryPage'
import GalleryDetailPage from '@/pages/GalleryDetailPage'
import NoticesPage from '@/pages/NoticesPage'
import NoticeDetailPage from '@/pages/NoticeDetailPage'
import MealsPage from '@/pages/MealsPage'
import QnaPage from '@/pages/QnaPage'
import QnaWritePage from '@/pages/QnaWritePage'
import QnaDetailPage from '@/pages/QnaDetailPage'
import JobsPage from '@/pages/JobsPage'
import JobDetailPage from '@/pages/JobDetailPage'
import JobApplyPage from '@/pages/JobApplyPage'
import ConsultPage from '@/pages/ConsultPage'
import PrivacyPage from '@/pages/PrivacyPage'
import NotFoundPage from '@/pages/NotFoundPage'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/guide" element={<GuidePage />} />
        <Route path="/guide/grade" element={<GradeGuidePage />} />
        <Route path="/programs" element={<ProgramsPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/gallery/:id" element={<GalleryDetailPage />} />
        <Route path="/notices" element={<NoticesPage />} />
        <Route path="/notices/:id" element={<NoticeDetailPage />} />
        <Route path="/meals" element={<MealsPage />} />
        <Route path="/qna" element={<QnaPage />} />
        <Route path="/qna/write" element={<QnaWritePage />} />
        <Route path="/qna/:id" element={<QnaDetailPage />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/jobs/:id" element={<JobDetailPage />} />
        <Route path="/jobs/apply" element={<JobApplyPage />} />
        <Route path="/consult" element={<ConsultPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
