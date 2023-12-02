package com.game.wof.wofgame.entity;

import com.google.cloud.spring.data.datastore.core.mapping.Entity;
import org.springframework.data.annotation.Id;

@Entity(name = "gameRecords")
public class GameRecord {
    @Id
    Long id;
    String userId;
    int score;
    String date;

    /**
     * constructor
     * @param userId
     * @param score
     * @param date
     */
    public GameRecord(String userId, int score, String date) {

        this.userId = userId;
        this.score = score;
        this.date = date;
    }

    /** setter and getter
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

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public String getDate() {
        return date;
    }

    public void setData(String date) {
        this.date = date;
    }

    @Override
    public String toString() {
        return "GameRecord{" +
                "id=" + id +
                ", userId='" + userId + '\'' +
                ", score='" + score + '\'' +
                ", data='" + date + '\'' +
                '}';
    }
}
