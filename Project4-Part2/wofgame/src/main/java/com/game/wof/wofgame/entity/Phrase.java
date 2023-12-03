package com.game.wof.wofgame.entity;

import com.google.cloud.spring.data.datastore.core.mapping.Entity;
import org.springframework.data.annotation.Id;

@Entity(name = "phrases")
public class Phrase {
    @Id
    Long id;

    String phrase;

    String difficulty;

    public Phrase(String phrase, String difficulty){
        this.phrase = phrase;
        this.difficulty = difficulty;
    }

    public String getPhrase(){
        return this.phrase;
    }
    
    public void setPhrase(String phrase){
        this.phrase = phrase;
    }

    public String getDifficulty(){
        return this.difficulty;
    }
    
    public void setDifficulty(String difficulty){
        this.difficulty = difficulty;
    }

    @Override
    public String toString() {
        return "Phrase{" +
                "id=" + id +
                ", phrase='" + phrase + '\'' +
                 ", difficulty='" + difficulty + '\'' +
                '}';
    }
}
