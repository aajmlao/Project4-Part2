package com.game.wof.wofgame.entity;

import com.google.cloud.spring.data.datastore.core.mapping.Entity;
import org.springframework.data.annotation.Id;

@Entity(name = "userRecords")
public class UserRecord {
    @Id
    Long id;
    String userId;
    String handle;

    /**
     * constructor
     * @param userId
     * @param handle
     */
    public UserRecord( String userId, String handle) {
        this.userId = userId;
        this.handle = handle;

    }

    /**
     * setter and getter
     * @return
     */
    public long getId() {
        return this.id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getHandle() {
        return handle;
    }

    public void setHandle(String handle) {
        this.handle = handle;
    }

    @Override
    public String toString() {
        return "GameRecord{" +
                "id=" + this.id +
                ", userId='" + this.userId + '\'' +
                ", handle='" + this.handle + '\'' +
                '}';
    }
}
