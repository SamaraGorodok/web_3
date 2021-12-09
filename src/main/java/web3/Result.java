package web3;

import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "saved_results")
public class Result {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;
    private double x;
    private double y;
    private double r;
    private boolean result;
    private LocalDateTime startTime;

    public Result() {

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Result(double x, double y, double r){
        this.x = x;
        this.y = y;
        this.r = r;
        this.result = check(this);
        this.startTime = LocalDateTime.now();
    }

    public Result(double x, double y, double r, boolean result, LocalDateTime startTime){
        this.x = x;
        this.y = y;
        this.r = r;
        this.result = result;
        this.startTime = startTime;
    }

    public static boolean check(Result result) {
        double x = result.x;
        double y = result.y;
        double r = result.r;

        return y >= 0 && x >= 0 && y <= (r / 2 - x / 2) || y >= 0 && x <= 0 && x >= -r / 2 && y <= r || x <= 0 && y <= 0 && x * x + y * y <= r * r;
    }

    public double getX() {
        return x;
    }

    public double getY() {
        return y;
    }

    public double getR() {
        return r;
    }

    public boolean isResult() {
        return result;
    }

    public LocalDateTime getStartTime() {
        return startTime;
    }
}
