import { useEffect, useRef, useState } from 'react'
import { site } from '@/config/site'
import { Icon } from '@/components/ui/Icon'

declare global {
  interface Window {
    // 카카오맵 SDK는 공식 타입 패키지를 제공하지 않아 필요한 부분만 최소로 선언한다.
    kakao?: {
      maps: {
        load: (callback: () => void) => void
        Map: new (container: HTMLElement, options: { center: unknown; level: number }) => unknown
        LatLng: new (lat: number, lng: number) => unknown
        Marker: new (options: { position: unknown }) => { setMap: (map: unknown) => void }
      }
    }
  }
}

const SDK_ID = 'kakao-map-sdk'

/**
 * 카카오맵 JS SDK 임베드.
 * site.kakaoMapKey가 아직 플레이스홀더({{...}})면 SDK를 불러오지 않고 안내용 대체 화면을 보여준다.
 */
export function KakaoMap({ className = 'h-[360px] lg:h-[440px]' }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [failed, setFailed] = useState(false)
  const keyReady = !site.kakaoMapKey.includes('{{')

  useEffect(() => {
    if (!keyReady) return

    const render = () => {
      const kakao = window.kakao
      if (!kakao) return
      kakao.maps.load(() => {
        if (!ref.current) return
        const center = new kakao.maps.LatLng(site.address.lat, site.address.lng)
        const map = new kakao.maps.Map(ref.current, { center, level: 3 })
        const marker = new kakao.maps.Marker({ position: center })
        marker.setMap(map)
      })
    }

    if (window.kakao?.maps) {
      render()
      return
    }

    let script = document.getElementById(SDK_ID) as HTMLScriptElement | null
    if (!script) {
      script = document.createElement('script')
      script.id = SDK_ID
      script.async = true
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${site.kakaoMapKey}&autoload=false`
      document.head.appendChild(script)
    }
    script.addEventListener('load', render)
    script.addEventListener('error', () => setFailed(true))
    return () => {
      script?.removeEventListener('load', render)
    }
  }, [keyReady])

  if (!keyReady || failed) {
    return (
      <div
        className={`${className} flex w-full flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-ink-300 bg-ink-50 p-6 text-center`}
      >
        <Icon name="mapPin" size={36} className="text-ink-400" />
        <p className="font-bold text-ink-700">지도 준비 중입니다</p>
        <p className="text-sm text-ink-500">
          카카오 개발자 콘솔에서 JavaScript 키를 발급받아
          <br />
          <code className="rounded bg-white px-1.5 py-0.5">src/config/site.ts</code>의 kakaoMapKey에 입력하면 지도가 표시됩니다.
        </p>
      </div>
    )
  }

  return <div ref={ref} className={`${className} w-full rounded-2xl`} role="application" aria-label="센터 위치 지도" />
}
