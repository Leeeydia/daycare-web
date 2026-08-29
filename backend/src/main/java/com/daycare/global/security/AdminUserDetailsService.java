package com.daycare.global.security;

import com.daycare.domain.admin.repository.AdminRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/** admin 테이블 기반 인증. Phase 4에서 JWT 발급 로직이 이 서비스를 재사용한다. */
@Service
@RequiredArgsConstructor
public class AdminUserDetailsService implements UserDetailsService {

    private final AdminRepository adminRepository;

    @Override
    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(String username) {
        return adminRepository.findByUsername(username)
                .map(admin -> User.withUsername(admin.getUsername())
                        .password(admin.getPassword())
                        .authorities(AuthorityUtils.createAuthorityList("ROLE_ADMIN"))
                        .accountLocked(admin.isLocked())
                        .build())
                .orElseThrow(() -> new UsernameNotFoundException("관리자 계정을 찾을 수 없습니다."));
    }
}
