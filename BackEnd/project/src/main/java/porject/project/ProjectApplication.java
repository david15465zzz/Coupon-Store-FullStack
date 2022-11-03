package porject.project;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.Bean;
import porject.project.entities.Facades;
import porject.project.job.CouponExpirationDailyJob;

import java.util.HashMap;


@SpringBootApplication
public class ProjectApplication {

	public static void main(String[] args) {
		ConfigurableApplicationContext ctx = SpringApplication.run(ProjectApplication.class, args);
		CouponExpirationDailyJob couponExpirationDailyJob= ctx.getBean(CouponExpirationDailyJob.class);
		couponExpirationDailyJob.run();

	}
	@Bean
	public HashMap<Long, Facades> facades(){
		return new HashMap<Long, Facades>();
	}





}
