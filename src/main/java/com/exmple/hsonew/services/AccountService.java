package com.exmple.hsonew.services;

import com.exmple.hsonew.dtos.response.AccountResponse;
import com.exmple.hsonew.entities.Account;
import com.exmple.hsonew.repositories.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.Arrays;
import java.util.Collections;

@Service
@Transactional
public class AccountService {

    @Autowired
    private AccountRepository accountRepository;

    // @Autowired
    // private PasswordEncoder passwordEncoder;

    /**
     * Đăng ký tài khoản mới
     */
    public Account register(String username, String password, String email, String phone, String ip) throws Exception {
        // Kiểm tra username đã tồn tại
        if (accountRepository.existsByUsername(username)) {
            throw new Exception("Tên đăng nhập đã tồn tại");
        }

        // Kiểm tra email đã tồn tại (nếu có)
        if (email != null && !email.trim().isEmpty() && accountRepository.existsByEmail(email)) {
            throw new Exception("Email đã được sử dụng");
        }

        // Tạo account mới
        Account account = new Account();
        account.setUsername(username);
        account.setPassword(password);
        account.setEmail(email);
        account.setPhone(phone);
        account.setCoin(0);
        account.setStatus(1);
        account.setLock(0);
        account.setIp(ip); // Set default IP
        account.setCreateTime(LocalDateTime.now());
        account.setCharNames("[]"); // Giá trị mặc định
        return accountRepository.save(account);
    }

    /**
     * Đăng nhập
     */
    public Account login(String loginId, String password) throws Exception {
        // Tìm account theo username hoặc email
        Optional<Account> accountOpt = accountRepository.findByUsernameAndActive(loginId);

        if (!accountOpt.isPresent()) {
            throw new Exception("Tài khoản không tồn tại hoặc đã bị khóa");
        }

        Account account = accountOpt.get();

        // Kiểm tra password (so sánh trực tiếp)
        if (!password.equals(account.getPassword())) {
            throw new Exception("Mật khẩu không chính xác");
        }

        // Cập nhật last IP có thể thêm sau
        accountRepository.save(account);

        return account;
    }

    /**
     * Thay đổi mật khẩu
     */
    public void changePassword(Integer accountId, String oldPassword, String newPassword) throws Exception {
        Optional<Account> accountOpt = accountRepository.findById(accountId);

        if (!accountOpt.isPresent()) {
            throw new Exception("Tài khoản không tồn tại");
        }

        Account account = accountOpt.get();

        // Kiểm tra mật khẩu cũ
        if (!oldPassword.equals(account.getPassword())) {
            throw new Exception("Mật khẩu cũ không chính xác");
        }

        // Cập nhật mật khẩu mới
        account.setPassword(newPassword);
        accountRepository.save(account);
    }

    /**
     * Cập nhật thông tin tài khoản
     */
    public Account updateAccount(Integer accountId, String email, String phone) throws Exception {
        Optional<Account> accountOpt = accountRepository.findById(accountId);

        if (!accountOpt.isPresent()) {
            throw new Exception("Tài khoản không tồn tại");
        }

        Account account = accountOpt.get();

        // Kiểm tra email trùng (nếu thay đổi)
        if (email != null && !email.equals(account.getEmail())) {
            if (accountRepository.existsByEmail(email)) {
                throw new Exception("Email đã được sử dụng");
            }
            account.setEmail(email);
        }

        // Cập nhật phone
        if (phone != null) {
            account.setPhone(phone);
        }

        return accountRepository.save(account);
    }

    /**
     * Tìm tài khoản theo ID
     */
    public Optional<AccountResponse.AccountData> findById(Integer id) {
        return accountRepository.findById(id).map(this::toAccountData);
    }

    /**
     * Tìm tài khoản theo username
     */
    public Optional<Account> findByUsername(String username) {
        return accountRepository.findByUsername(username);
    }

    /**
     * Cập nhật coin
     */
    public void updateCoin(Integer accountId, Integer coinAmount) throws Exception {
        Optional<Account> accountOpt = accountRepository.findById(accountId);

        if (!accountOpt.isPresent()) {
            throw new Exception("Tài khoản không tồn tại");
        }

        Account account = accountOpt.get();
        account.setCoin(account.getCoin() + coinAmount);
        accountRepository.save(account);
    }

    public List<AccountResponse.AccountData> findAll() {
        return accountRepository.findAll().stream().map(this::toAccountData).collect(Collectors.toList());
    }

    public AccountResponse.AccountData save(Account account) {
        return toAccountData(accountRepository.save(account));
    }

    public void deleteById(Integer id) {
        accountRepository.deleteById(id);
    }

    private AccountResponse.AccountData toAccountData(Account account) {
        List<String> charNamesList = (account.getCharNames() != null && !account.getCharNames().isEmpty())
                ? Arrays.asList(account.getCharNames().split(","))
                : Collections.emptyList();
        return new AccountResponse.AccountData(
                account.getId(),
                account.getUsername(),
                account.getPassword(),
                account.getEmail(),
                account.getPhone(),
                account.getCoin(),
                account.getAcAdmin(),
                charNamesList,
                account.getStatus(),
                account.getLock(),
                account.getIp(),
                account.getLastIp(),
                account.getTiennap(),
                account.getPass2(),
                account.getNaptuan(),
                account.getTongnap(),
                account.getOtp(),
                account.getExpirationOtp(),
                account.getToken(),
                account.getCreateTime());
    }
}