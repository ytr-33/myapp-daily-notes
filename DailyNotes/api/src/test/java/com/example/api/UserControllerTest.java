package com.example.api;

import com.example.api.controller.UserController;
import com.example.api.model.User;
import com.example.api.model.UserRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * ユーザーコントローラーのテスト
 */
@SpringBootTest
@AutoConfigureMockMvc
public class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserRepository userRepository;

    @AfterEach
    public void tearDown() {
        userRepository.deleteAll();
    }

    @Test
    public void testGetAllUsers() throws Exception {
        mockMvc.perform(get("/api/users"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON));
    }

    @Test
    public void testCreateUser() throws Exception {
        String userJson = """
                {
                    "name": "山田太郎",
                    "email": "yamada@example.com",
                    "phone": "090-1111-1111",
                    "age": 35
                }
                """;

        mockMvc.perform(post("/api/users")
                .contentType(MediaType.APPLICATION_JSON)
                .content(userJson))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.name").value("山田太郎"))
                .andExpect(jsonPath("$.email").value("yamada@example.com"));
    }

    @Test
    public void testCreateUserValidationErrorInvalidEmail() throws Exception {
        String userJson = """
                {
                    "name": "山田太郎",
                    "email": "invalid-email",
                    "phone": "090-1111-1111",
                    "age": 35
                }
                """;

        mockMvc.perform(post("/api/users")
                .contentType(MediaType.APPLICATION_JSON)
                .content(userJson))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.email").exists());
    }

    @Test
    public void testCreateUserValidationErrorBlankName() throws Exception {
        String userJson = """
                {
                    "name": "",
                    "email": "blankname@example.com",
                    "phone": "090-1111-1111",
                    "age": 35
                }
                """;

        mockMvc.perform(post("/api/users")
                .contentType(MediaType.APPLICATION_JSON)
                .content(userJson))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.name").exists());
    }

    @Test
    public void testCreateUserValidationErrorNegativeAge() throws Exception {
        String userJson = """
                {
                    "name": "山田太郎",
                    "email": "negativeage@example.com",
                    "phone": "090-1111-1111",
                    "age": -1
                }
                """;

        mockMvc.perform(post("/api/users")
                .contentType(MediaType.APPLICATION_JSON)
                .content(userJson))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.age").exists());
    }

    @Test
    public void testCreateUserConflictEmail() throws Exception {
        User existingUser = new User();
        existingUser.setName("既存ユーザー");
        existingUser.setEmail("duplicate@example.com");
        existingUser.setAge(30);
        userRepository.save(existingUser);

        String userJson = """
                {
                    "name": "新規ユーザー",
                    "email": "duplicate@example.com",
                    "phone": "090-1111-1111",
                    "age": 20
                }
                """;

        mockMvc.perform(post("/api/users")
                .contentType(MediaType.APPLICATION_JSON)
                .content(userJson))
                .andExpect(status().isConflict());
    }

    @Test
    public void testGetUserById() throws Exception {
        User user = new User();
        user.setName("テストユーザー");
        user.setEmail("test@example.com");
        user.setAge(20);
        User savedUser = userRepository.save(user);

        mockMvc.perform(get("/api/users/" + savedUser.getId()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("テストユーザー"));
    }

    @Test
    public void testUpdateUser() throws Exception {
        User user = new User();
        user.setName("更新前");
        user.setEmail("before@example.com");
        user.setAge(20);
        User savedUser = userRepository.save(user);

        String updateJson = """
                {
                    "name": "更新後",
                    "email": "after@example.com",
                    "phone": "090-2222-2222",
                    "age": 21
                }
                """;

        mockMvc.perform(put("/api/users/" + savedUser.getId())
                .contentType(MediaType.APPLICATION_JSON)
                .content(updateJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("更新後"))
                .andExpect(jsonPath("$.email").value("after@example.com"));
    }

    @Test
    public void testUpdateUserConflictEmail() throws Exception {
        User user1 = new User();
        user1.setName("ユーザー1");
        user1.setEmail("user1@example.com");
        user1.setAge(20);
        User savedUser1 = userRepository.save(user1);

        User user2 = new User();
        user2.setName("ユーザー2");
        user2.setEmail("user2@example.com");
        user2.setAge(25);
        userRepository.save(user2);

        String updateJson = """
                {
                    "name": "更新後",
                    "email": "user2@example.com",
                    "phone": "090-2222-2222",
                    "age": 21
                }
                """;

        mockMvc.perform(put("/api/users/" + savedUser1.getId())
                .contentType(MediaType.APPLICATION_JSON)
                .content(updateJson))
                .andExpect(status().isConflict());
    }

    @Test
    public void testDeleteUser() throws Exception {
        User user = new User();
        user.setName("削除対象");
        user.setEmail("delete@example.com");
        user.setAge(30);
        User savedUser = userRepository.save(user);

        mockMvc.perform(delete("/api/users/" + savedUser.getId()))
                .andExpect(status().isNoContent());

        mockMvc.perform(get("/api/users/" + savedUser.getId()))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testGetUserByEmail() throws Exception {
        User user = new User();
        user.setName("検索対象");
        user.setEmail("search@example.com");
        user.setAge(25);
        userRepository.save(user);

        mockMvc.perform(get("/api/users/search/email")
                .param("email", "search@example.com"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("検索対象"));
    }
}
